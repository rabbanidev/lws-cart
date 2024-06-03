import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../../../lib/jwt';
import { getUserById, updateUser } from '../../../../../services/user.service';
import envConfig from '../../../../../config/envConfig';
import { Secret } from 'jsonwebtoken';
import { replaceMongoIdInObject } from '../../../../../utils/mongo';
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

    const result = await getUserById(tokenUser.id);

    const user = replaceMongoIdInObject(result) as IUser;

    return NextResponse.json(
      { user },
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

    const jsonData = await req.json();
    const tokenUser = verifyToken(accessToken, envConfig.jwt.secret as Secret);

    const result = await updateUser(tokenUser.id, jsonData);

    const user = replaceMongoIdInObject(result.toObject()) as IUser;

    return NextResponse.json(
      { user },
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