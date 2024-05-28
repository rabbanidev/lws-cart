import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { verifyToken } from '../../../../lib/jwt';
import envConfig from '../../../../config/envConfig';
import { Secret } from 'jsonwebtoken';
import {
  createOrRemoveWishlistItem,
  getWishlistItems,
} from '../../../../services/wishlist.service';

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

    const items = await getWishlistItems(user.id);

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
    const jsonData = await req.json();

    await createOrRemoveWishlistItem(user.id, jsonData.productId);

    return NextResponse.json(
      { message: 'Items have been successfully updated.' },
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
