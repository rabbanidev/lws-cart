'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ImageGallery() {
  const [image, setImage] = useState('/products/product1.jpg');

  const handleImageChange = (path: string) => {
    setImage(`/products/${path}`);
  };

  return (
    <div>
      <Image
        src={image}
        alt="product"
        className="w-full"
        width={100}
        height={100}
        unoptimized
      />
      <div className="mt-4 grid grid-cols-5 gap-4">
        <Image
          src={image}
          alt="product2"
          className="w-full cursor-pointer border border-primary"
          width={100}
          height={100}
          onClick={() => handleImageChange('product1.jpg')}
        />
        <Image
          src="/products/product2.jpg"
          alt="product2"
          className="w-full cursor-pointer border"
          width={100}
          height={100}
          onClick={() => handleImageChange('product2.jpg')}
        />
        <Image
          src="/products/product3.jpg"
          alt="product2"
          className="w-full cursor-pointer border"
          width={100}
          height={100}
          onClick={() => handleImageChange('product3.jpg')}
        />
        <Image
          src="/products/product4.jpg"
          alt="product2"
          className="w-full cursor-pointer border"
          width={100}
          height={100}
          onClick={() => handleImageChange('product4.jpg')}
        />
        <Image
          src="/products/product5.jpg"
          alt="product2"
          className="w-full cursor-pointer border"
          width={100}
          height={100}
          onClick={() => handleImageChange('product5.jpg')}
        />
      </div>
    </div>
  );
}
