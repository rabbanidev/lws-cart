import { IoMdEye } from 'react-icons/io';

type Props = {
  title: string;
};

export default function ViewButton({ title }: Props) {
  return (
    <button
      className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
      title={title}
    >
      <IoMdEye />
    </button>
  );
}
