'use client';

import Tabs from '@/components/UI/Tabs';
import { Dictionary, Review } from '../../../../types/index';
import { useState } from 'react';
import Reviews from './Reviews';

type Props = {
  dict: Dictionary;
  description: string | undefined;
  reviews?: Review[];
};

export default function DescriptionAndReviews({
  dict,
  description,
  reviews,
}: Props) {
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
            <p>{description}</p>
          </div>
        </div>
      ) : (
        <Reviews reviews={reviews || []} noReview={dict.product.noReview} />
      )}
    </div>
  );
}
