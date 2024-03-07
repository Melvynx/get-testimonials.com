/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { Review } from "@prisma/client";
import Link from "next/link";
import { ReviewStar } from "./ReviewStar";

export type ReviewItemProps = {
  review: Review;
  className?: string;
};

export const ReviewItem = ({ review, className }: ReviewItemProps) => {
  return (
    <div className={cn("flex h-fit flex-col", className)}>
      <div className="flex items-center gap-2">
        {review.image ? (
          <img
            className="size-14 rounded-full"
            src={review.image}
            alt={review.name ?? ""}
          />
        ) : null}
        <div className="flex flex-col gap-1">
          <Link
            href={review.socialLink ?? "#"}
            className="group flex items-center gap-2"
          >
            <p className="text-lg group-hover:underline">{review.name}</p>
          </Link>
          <ReviewStar stars={review.rating} />
        </div>
      </div>
      <p className="citation mt-4">{review.text}</p>
    </div>
  );
};
