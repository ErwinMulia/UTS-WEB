type RatingStarsProps = {
    rating: number;
    max?: number;
    className?: string;
  };
  
  export const RatingStars = ({ rating, max = 5, className = '' }: RatingStarsProps) => (
    <div className={`flex items-center ${className}`}>
      <div className="text-yellow-500 mr-2">
        {"★".repeat(Math.floor(rating)) + "☆".repeat(max - Math.floor(rating))}
      </div>
      <span className="text-sm text-gray-600">{rating.toFixed(1)}/{max.toFixed(1)}</span>
    </div>
  );