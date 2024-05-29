import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import envConfig from '../../../../config/envConfig';
import { verifyToken } from '../../../../lib/jwt';
import { Secret } from 'jsonwebtoken';
import { addToCart, getFromCarts } from '../../../../services/cart.service';
import { getProduct } from '../../../../services/product.service';
import { Product as IProduct } from '../../../../types/index';

export async function POST(req: NextRequest) {
  try {
    const accessToken = headers().get('authorization')
      ? headers().get('authorization')?.split(' ')[1]
      : null;

    if (!accessToken) {
      return NextResponse.json(
        { message: 'User is not authenticated' },
        {
          status: 401,
        },
      );
    }

    const user = verifyToken(accessToken, envConfig.jwt.secret as Secret);
    const { productId, quantity, selectedColor, selectedSize } =
      await req.json();

    const product = (await getProduct(productId)) as IProduct;

    if (quantity > product.stock) {
      return NextResponse.json(
        {
          message: `Not enough stock. Please select up to ${product.stock}`,
        },
        {
          status: 400,
        },
      );
    }

    await addToCart({
      productId,
      quantity,
      selectedColor,
      selectedSize,
      userId: user.id,
    });

    return NextResponse.json(
      { message: 'Added to your cart.' },
      {
        status: 201,
      },
    );
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const accessToken = headers().get('authorization')
      ? headers().get('authorization')?.split(' ')[1]
      : null;

    if (!accessToken) {
      return NextResponse.json(
        { message: 'User is not authenticated' },
        {
          status: 401,
        },
      );
    }

    const user = verifyToken(accessToken, envConfig.jwt.secret as Secret);

    const items = await getFromCarts(user.id);

    return NextResponse.json(
      { items },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
