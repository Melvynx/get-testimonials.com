import { Star } from "lucide-react";
import { useState } from "react";

const RatingSelector = ({
  onSelect,
}: {
  onSelect: (rating: number) => void;
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const starRatings: Record<number, string> = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Perfect",
  };

  const handleMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleClick = (index: number) => {
    setRating(index);
    onSelect(index);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
            className="cursor-pointer p-1 drop-shadow-md"
          >
            <Star
              size={32}
              key={index}
              fill={
                (hoverRating ? index <= hoverRating : index <= rating!)
                  ? "#FFD700"
                  : "transparent"
              }
              color={"#FFD700"}
            />
          </div>
        ))}
      </div>
      <p className="w-full text-center text-sm font-light text-muted-foreground">
        {rating
          ? starRatings[rating]
          : hoverRating
          ? starRatings[hoverRating]
          : " "}
      </p>
    </div>
  );
};

export default RatingSelector;
