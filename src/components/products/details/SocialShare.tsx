import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function SocialShare() {
  return (
    <div className="mt-4 flex gap-3">
      <a
        href="#"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-gray-500"
      >
        <FaFacebookF />
      </a>
      <a
        href="#"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-gray-500"
      >
        <FaTwitter />
      </a>
      <a
        href="#"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-gray-500"
      >
        <FaInstagram />
      </a>
    </div>
  );
}
