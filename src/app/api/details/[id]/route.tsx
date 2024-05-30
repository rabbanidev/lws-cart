/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { getProduct } from '../../../../../services/product.service';
import { Product } from '../../../../../types/index';

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const product = (await getProduct(id)) as Product;
  const imageUrl =
    'https://plus.unsplash.com/premium_photo-1669863280125-7789ef60adc0';

  console.log('imageUrl', imageUrl);

  return new ImageResponse(<img src={imageUrl} alt={product.name} />, {
    width: 1200,
    height: 600,
  });
}
