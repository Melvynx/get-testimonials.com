import { requiredCurrentUser } from "@/auth/current-user";
import { Layout, LayoutTitle } from "@/components/layout";
import { PricingSection } from "@/features/landing/PricingSection";
import { prisma } from "@/prisma";
import type { PageParams } from "@/types/next";
import { AlertTriangle } from "lucide-react";
import { ProductForm } from "../[productId]/edit/ProductForm";

export default async function RoutePage(props: PageParams<{}>) {
  const user = await requiredCurrentUser();

  const isAuthorized =
    user.plan === "PREMIUM"
      ? true
      : (await prisma.product.count({
          where: {
            userId: user.id,
          },
        })) < 1;

  if (!isAuthorized) {
    return (
      <Layout>
        <LayoutTitle>Create product</LayoutTitle>
        <p>
          <AlertTriangle className="inline" />
          Sorry, you need to upgrade to our premium plan to create more
          products.
        </p>
        <PricingSection />
      </Layout>
    );
  }

  return (
    <Layout>
      <LayoutTitle>Create product</LayoutTitle>
      <ProductForm />
    </Layout>
  );
}
