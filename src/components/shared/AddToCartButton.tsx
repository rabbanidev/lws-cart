import { FaShoppingBag } from 'react-icons/fa';

type Props = {
  text: string;
  isDetails: boolean;
};

export default function AddToCartButton({ text, isDetails }: Props) {
  return isDetails ? (
    <button
      type="button"
      className="flex items-center gap-2 rounded border border-primary bg-primary px-8 py-2 font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
    >
      <FaShoppingBag />
      {text}
    </button>
  ) : (
    <button
      type="button"
      className="block w-full rounded-b border border-primary bg-primary py-1 text-center text-white transition hover:bg-transparent hover:text-primary"
    >
      {text}
    </button>
  );
}
