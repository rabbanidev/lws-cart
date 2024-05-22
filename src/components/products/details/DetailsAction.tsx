import AddToCartButton from '@/components/shared/AddToCartButton';
import WishlistButton from '@/components/shared/WishlistButton';

type Props = {
  qtyTitle: string;
};

export default function DetailsAction({ qtyTitle }: Props) {
  return (
    <>
      <div className="mt-4">
        <h3 className="mb-1 text-sm uppercase text-gray-800">{qtyTitle}</h3>
        <div className="flex w-max divide-x divide-gray-300 border border-gray-300 text-gray-600">
          <button
            type="button"
            className="flex h-8 w-8 cursor-pointer select-none items-center justify-center text-xl"
          >
            -
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center text-base"
          >
            4
          </button>
          <div className="flex h-8 w-8 cursor-pointer select-none items-center justify-center text-xl">
            +
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
        <AddToCartButton isDetails text="Add To Cart" />
        <WishlistButton isDetails text="Wishlist" />
      </div>
    </>
  );
}
