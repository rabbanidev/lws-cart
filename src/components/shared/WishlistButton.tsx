import { FaRegHeart } from 'react-icons/fa';

type Props = {
  text: string;
  isDetails: boolean;
};

export default function WishlistButton({ text, isDetails }: Props) {
  return isDetails ? (
    <button
      type="button"
      className="flex items-center gap-2 rounded border border-gray-300 px-8 py-2 font-medium uppercase text-gray-600 transition hover:text-primary"
    >
      <FaRegHeart />
      {text}
    </button>
  ) : (
    <button
      type="button"
      className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
      title={text}
    >
      <FaRegHeart />
    </button>
  );
}
