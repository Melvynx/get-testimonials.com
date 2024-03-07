import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export type ReviewStarProps = {
  stars: number;
  size?: number;
  className?: string;
};

export const ReviewStar = (props: ReviewStarProps) => {
  return (
    <div className={cn("flex gap-1 text-yellow-400", props.className)}>
      {Array.from({ length: 5 }).map((_, i) => {
        const isFilled = i < props.stars;
        return (
          <Star
            size={props.size}
            key={i}
            fill={isFilled ? "currentColor" : "null"}
          />
        );
      })}
    </div>
  );
};
