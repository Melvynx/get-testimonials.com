"use server";

import { EMAIL_FROM } from "@/config";
import { prisma } from "@/prisma";
import { resend } from "@/resend";
import { ActionError, userAction } from "@/safe-actions";
import { User } from "@prisma/client";
import { z } from "zod";
import FirstProductCreatedEmail from "../../../../../emails/FirstProductCreatedEmail";
import { ProductSchema } from "./product.schema";

const verifySlugUniqueness = async (slug: string, productId?: string) => {
  const slugExists = await prisma.product.count({
    where: {
      slug: slug,
      id: productId
        ? {
            not: productId,
          }
        : undefined,
    },
  });

  if (slugExists) {
    throw new ActionError("Slug already exists");
  }
};

const verifyUserPlan = async (user: User) => {
  if (user.plan === "PREMIUM") {
    return;
  }

  const userProductsCount = await prisma.product.count({
    where: {
      userId: user.id,
    },
  });

  if (userProductsCount > 0) {
    throw new ActionError(
      "You need to upgrade to premium to create more products"
    );
  }
};

const sendEmailIfUserCreatedFirstProduct = async (user: User) => {
  if (user.plan === "PREMIUM") return;

  console.log("PREMIUM PLAN");

  const userProductsCount = await prisma.product.count({
    where: {
      userId: user.id,
    },
  });

  if (userProductsCount !== 1) {
    return;
  }

  console.log("USER COUNT", userProductsCount);

  const product = await prisma.product.findFirst({
    where: {
      userId: user.id,
    },
    select: {
      slug: true,
      name: true,
    },
  });

  console.log("poruct", product);
  if (!product) {
    return;
  }

  await resend.emails.send({
    to: user.email ?? "",
    subject: "You created your first product",
    from: EMAIL_FROM,
    react: FirstProductCreatedEmail({
      product: product.name,
      slug: product.slug,
    }),
  });
};

export const createProductAction = userAction(
  ProductSchema,
  async (input, context) => {
    await verifySlugUniqueness(input.slug);
    await verifyUserPlan(context.user);

    const product = await prisma.product.create({
      data: {
        ...input,
        userId: context.user.id,
      },
    });

    await sendEmailIfUserCreatedFirstProduct(context.user);

    return product;
  }
);

export const updateProductAction = userAction(
  z.object({
    id: z.string(),
    data: ProductSchema,
  }),
  async (input, context) => {
    await verifySlugUniqueness(input.data.slug, input.id);

    const updatedProduct = await prisma.product.update({
      where: {
        id: input.id,
        userId: context.user.id,
      },
      data: input.data,
    });

    return updatedProduct;
  }
);

export const deleteProductAction = userAction(
  z.string(),
  async (productId, context) => {
    await prisma.product.delete({
      where: {
        id: productId,
        userId: context.user.id,
      },
    });
  }
);
