import { Review } from '../../../../types/index';

type Props = {
  reviews: Review[];
  noReview: string;
};

export default function Reviews({ reviews, noReview }: Props) {
  return (
    <div className="w-3/5 pt-6">
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index}>
            <h4 className="text-lg font-medium capitalize">
              {review.user.name}
            </h4>
            <p className="text-sm text-gray-600">{review.text}</p>
          </div>
        ))
      ) : (
        <p className="text-lg font-medium uppercase">{noReview}</p>
      )}
    </div>
  );
}
