"use server";

import { openai } from "@/openai";
import { prisma } from "@/prisma";
import { ActionError, action } from "@/safe-actions";
import { Review } from "@prisma/client";
import { headers } from "next/headers";
import { z } from "zod";
import { ReviewSchema } from "./review.schema";

export const getReviewAction = action(
  z.object({
    productId: z.string(),
    id: z.string(),
  }),
  async (input) => {
    const review = await prisma.review.findUnique({
      where: {
        id: input.id,
        productId: input.productId,
      },
    });

    if (!review) {
      throw new ActionError("Review not found");
    }

    return review;
  }
);

export const updateReviewAction = action(ReviewSchema, async (input) => {
  const headerList = headers();
  const userIp =
    headerList.get("x-real-ip") || headerList.get("x-forwarded-for");

  if (!userIp) {
    throw new ActionError("User IP not found");
  }

  let review: Review | null = null;

  if (input.id) {
    review = await prisma.review.findUnique({
      where: {
        id: input.id,
        ip: userIp,
        productId: input.productId,
      },
    });

    if (!review) {
      throw new ActionError("Review not found");
    }

    review = await prisma.review.update({
      where: {
        id: input.id,
      },
      data: {
        rating: input.rating ?? review.rating,
        audio: input.audio ?? review.audio,
        text: input.text ?? review.text,
        socialLink: input.socialLink ?? review.socialLink,
        name: input.name ?? review.name,
      },
    });
  } else {
    review = await prisma.review.create({
      data: {
        productId: input.productId,
        ip: userIp,
        rating: input.rating ?? 0,
        audio: input.audio,
        text: input.text,
        socialLink: input.socialLink,
        name: input.name,
      },
    });
  }

  return review;
});

export const processAudioAction = action(
  z.object({
    formData: z.instanceof(FormData),
    reviewId: z.string(),
    productId: z.string(),
  }),
  async (input) => {
    const headerList = headers();
    const userIp =
      headerList.get("x-real-ip") || headerList.get("x-forwarded-for");

    if (!userIp) {
      throw new ActionError("User IP not found");
    }

    const review = await prisma.review.findUnique({
      where: {
        id: input.reviewId,
        ip: userIp,
        productId: input.productId,
      },
      include: {
        product: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    if (!review) {
      throw new ActionError("Review not found");
    }

    if (review.text) {
      throw new ActionError("Review already has text");
    }

    const audioFile = input.formData.get("audio");

    const result = await openai.audio.transcriptions.create({
      file: audioFile as any,
      model: "whisper-1",
    });

    if (!result.text) {
      throw new ActionError("Failed to transcribe audio");
    }

    const finalResult = await openai.chat.completions.create({
      model: "gpt-4",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: `Context:
You are a transcriptionist and you are transcribing an audio review for a product. The audio review is about the product "${review.product.name}".

Goal:
You need to return the transcript of the audio review.

Criteria:
- You CAN'T add, edit, or remove any information from the audio review.
- You JUST foramtting and regrouping the information from the audio review.
- You USE THE SAME language and tone as the customer used in the audio review.

Response format:
- Return the plain text content review, without title or any other information.`,
        },
        {
          role: "user",
          content: result.text,
        },
      ],
    });

    const resultText = finalResult.choices[0].message.content;

    await prisma.review.update({
      where: {
        id: input.reviewId,
      },
      data: {
        text: resultText,
      },
    });

    return review;
  }
);
