import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../../../lib/jwt';
import envConfig from '../../../../../config/envConfig';
import { Secret } from 'jsonwebtoken';
import { replaceMongoIdInObject } from '../../../../../utils/mongo';
import {
  createOrUpdateAddress,
  getAddressByUserId,
} from '../../../../../services/address.service';
import { User as IUser } from '../../../../../types/index';

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

    const tokenUser = verifyToken(accessToken, envConfig.jwt.secret as Secret);

    const result = await getAddressByUserId(tokenUser.id);

    const address = replaceMongoIdInObject(result) as IUser;

    return NextResponse.json(
      { address },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
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

    const jsonData = await req.json();
    const tokenUser = verifyToken(accessToken, envConfig.jwt.secret as Secret);

    const result = await createOrUpdateAddress(tokenUser.id, jsonData);

    const address = replaceMongoIdInObject(result.toObject()) as IUser;

    return NextResponse.json(
      { address },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
