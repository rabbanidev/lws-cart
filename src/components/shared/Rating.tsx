import { FaStar } from 'react-icons/fa';

type Props = {
  rating: number;
};

export default function Rating({ rating }: Props) {
  const ratingValue = Math.ceil(rating);
  const nonRatingValue = 5 - ratingValue;

  const ratingArray = Array.from({ length: ratingValue }).fill(null);
  const nonRatingArray = Array.from({ length: nonRatingValue }).fill(null);

  return (
    <div className="flex gap-1 text-sm">
      {ratingArray.map((_rate, index) => (
        <span key={index} className="text-yellow-400">
          <FaStar size={18} />
        </span>
      ))}
      {nonRatingArray.map((_rate, index) => (
        <span key={index} className="text-gray-700">
          <FaStar size={18} />
        </span>
      ))}
    </div>
  );
}
