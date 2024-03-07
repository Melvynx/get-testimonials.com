/* eslint-disable @next/next/no-img-element */
import { Layout } from "@/components/layout";
import { prisma } from "@/prisma";
import type { PageParams } from "@/types/next";
import { notFound } from "next/navigation";
import { ReviewItem } from "./ReviewCard";

export const maxDuration = 300;

export default async function RoutePage(props: PageParams<{ slug: string }>) {
  const product = await prisma.product.findFirst({
    where: {
      slug: props.params.slug,
    },
    include: {
      reviews: {
        where: {
          text: {
            not: null,
          },
          name: {
            not: null,
          },
        },
      },
    },
  });

  if (!product) {
    notFound();
  }

  // calcule la moyenne des reviews
  const review = await prisma.review.aggregate({
    where: {
      productId: product.id,
      text: {
        not: null,
      },
      name: {
        not: null,
      },
    },
    _avg: {
      rating: true,
    },
    _count: {
      _all: true,
    },
  });

  return (
    <Layout className="my-12 flex h-full flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        {product.image ? (
          <img className="size-12" src={product.image} alt={product.name} />
        ) : null}
        <h1 className="text-2xl font-bold">{product.name}</h1>
      </div>
      <div>
        <h2 className="text-4xl font-extrabold">{review._avg.rating} / 5</h2>
        <p>{review._count._all} reviews</p>
      </div>
      <div className="size-full columns-1 md:columns-2 lg:columns-3">
        {product.reviews.map((r) => (
          <ReviewItem
            className="mb-4 break-inside-avoid-column"
            review={r}
            key={r.id}
          />
        ))}
      </div>
    </Layout>
  );
}
