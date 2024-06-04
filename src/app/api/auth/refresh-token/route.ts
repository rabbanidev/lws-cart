import { NextRequest, NextResponse } from 'next/server';
import {
  generateToken,
  verifyToken as verifyTokenFn,
} from '../../../../../lib/jwt';
import envConfig from '../../../../../config/envConfig';
import { JwtPayload, Secret } from 'jsonwebtoken';
import User from '../../../../../models/user.model';

export async function POST(request: NextRequest) {
  try {
    const jsonData = await request.json();

    // verify token
    let verifyToken = null;
    try {
      verifyToken = verifyTokenFn(
        jsonData.refreshToken,
        envConfig.jwt.secret as Secret,
      );
    } catch (error) {
      throw new Error('Invalid refresh token!');
    }

    // Check user exit in database
    const { id } = verifyToken as JwtPayload;
    const userExit = await User.findById(id);

    if (!userExit) {
      throw new Error('User not found!');
    }

    //  Generate a new access token
    const newAccessToken = generateToken(
      { id: userExit._id },
      envConfig.jwt.secret as Secret,
      envConfig.jwt.access_token_expire_in as string,
    );

    return NextResponse.json(
      {
        backendTokens: {
          accessToken: newAccessToken,
          refreshToken: jsonData.refreshToken,
          expireIn: envConfig.jwt.access_token_expire_in,
        },
      },
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
