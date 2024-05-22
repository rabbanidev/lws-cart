'use client';

import Tabs from '@/components/UI/Tabs';
import { Dictionary } from '../../../../types';
import { useState } from 'react';
import Reviews from './Reviews';

type Props = {
  dict: Dictionary;
};

export default function DescriptionAndReviews({ dict }: Props) {
  const options: string[] = [dict.product.description, dict.product.reviews];

  const [tabElement, setTabElement] = useState<string>(options[0]);

  return (
    <div className="container pb-16">
      <div className="border-b border-gray-200 text-center text-sm font-medium text-gray-500">
        <Tabs
          tabs={options}
          currentTab={tabElement}
          onTab={(tab: string) => setTabElement(tab)}
        />
      </div>
      {tabElement === 'Product details' ||
      tabElement === 'প্রোডাক্টস এর বিবরণ' ? (
        <div className="w-3/5 pt-6">
          <div className="text-gray-600">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              necessitatibus deleniti natus dolore cum maiores suscipit optio
              itaque voluptatibus veritatis tempora iste facilis non aut
              sapiente dolor quisquam, ex ab.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
              quae accusantium voluptatem blanditiis sapiente voluptatum. Autem
              ab, dolorum assumenda earum veniam eius illo fugiat possimus illum
              dolor totam, ducimus excepturi.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              quia modi ut expedita! Iure molestiae labore cumque nobis quasi
              fuga, quibusdam rem? Temporibus consectetur corrupti rerum
              veritatis numquam labore amet.
            </p>
          </div>
        </div>
      ) : (
        <Reviews />
      )}
    </div>
  );
}
