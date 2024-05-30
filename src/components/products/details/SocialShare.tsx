'use client';

import { FaFacebookF, FaLinkedin, FaTwitter } from 'react-icons/fa';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share';
// import envConfig from '../../../../config/envConfig';

export default function SocialShare({ id }: { id: string }) {
  const url = `https://lws-cart.vercel.app/products/${id}`;

  return (
    <div className="mt-4 flex gap-3">
      <FacebookShareButton url={url}>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-gray-500">
          <FaFacebookF />
        </span>
      </FacebookShareButton>

      <TwitterShareButton url={url}>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-gray-500">
          <FaTwitter />
        </span>
      </TwitterShareButton>

      <LinkedinShareButton url={url}>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-gray-500">
          <FaLinkedin />
        </span>
      </LinkedinShareButton>
    </div>
  );
}
