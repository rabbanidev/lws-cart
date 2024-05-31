import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { updateQuantity } from '../../../../../services/cart.service';
import Cart from '../../../../../models/cart.model';

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

    const { cartItemId, productId, type } = await req.json();

    const cartItem = await Cart.findById(cartItemId);

    if (!cartItem) {
      return NextResponse.json(
        { message: 'Cart item not found.' },
        {
          status: 404,
        },
      );
    }

    await updateQuantity({
      cartItemId,
      productId,
      quantity: 1,
      type,
    });

    return NextResponse.json(
      { message: 'Update to your cart.' },
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
