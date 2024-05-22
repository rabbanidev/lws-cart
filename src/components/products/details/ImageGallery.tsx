'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
  alt: string;
  images: string[];
};

export default function ImageGallery({ alt, images }: Props) {
  const [image, setImage] = useState(images[0]);

  const handleImageChange = (path: string) => {
    setImage(path);
  };

  return (
    <div className="flex flex-col gap-x-5 lg:flex-row">
      <div className="order-2 mt-4 flex gap-2 lg:order-1 lg:mt-0 lg:flex-col">
        {images.map((img) => (
          <Image
            key={img}
            src={img}
            alt={alt}
            className={`h-24 w-24 cursor-pointer border ${img === image ? 'border-primary p-1' : ''}`}
            width={100}
            height={100}
            onClick={() => handleImageChange(img)}
          />
        ))}
      </div>
      <Image
        src={image}
        alt={alt}
        className="order-1 h-[512px] w-full"
        width={100}
        height={100}
        unoptimized
      />
    </div>
  );
}
