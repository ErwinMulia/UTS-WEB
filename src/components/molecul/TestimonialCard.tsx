import { RatingStars } from '@/components/atom/RatingStars';

type TestimonialCardProps = {
  rating: number;
  text: string;
  author: string;
  className?: string;
};

export const TestimonialCard = ({ rating, text, author, className = '' }: TestimonialCardProps) => (
  <div className={`bg-gray-100 p-4 rounded-lg shadow-sm ${className}`}>
    <RatingStars rating={rating} className="mb-2" />
    <p className="text-gray-800">{text}</p>
    <span className="text-sm italic text-gray-500 block mt-2">– {author}</span>
  </div>
);