'use client';

import { useEffect, useState } from 'react';
import { FaFacebookF, FaLinkedin, FaTwitter } from 'react-icons/fa';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share';

export default function SocialShare() {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <div className="mt-4 flex gap-3">
      <FacebookShareButton url={currentUrl}>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-gray-500">
          <FaFacebookF />
        </span>
      </FacebookShareButton>

      <TwitterShareButton url={currentUrl}>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-gray-500">
          <FaTwitter />
        </span>
      </TwitterShareButton>

      <LinkedinShareButton url={currentUrl}>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-gray-500">
          <FaLinkedin />
        </span>
      </LinkedinShareButton>
    </div>
  );
}
