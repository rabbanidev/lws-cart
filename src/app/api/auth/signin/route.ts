import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../../config/dbConfig';
import { getUserByEmail } from '../../../../../services/user.service';
import { comparePassword } from '../../../../../lib/bcrypt';
import { replaceMongoIdInObject } from '../../../../../utils/mongo';
import { User as IUser } from '../../../../../types/index';
import { generateToken } from '../../../../../lib/jwt';
import envConfig from '../../../../../config/envConfig';
import { Secret } from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: { message: 'Provides are all credentials!' } },
        {
          status: 400,
        },
      );
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { error: { message: 'Invalid credentials!' } },
        {
          status: 404,
        },
      );
    }

    const isPasswordMatched = await comparePassword(password, user.password);

    if (!isPasswordMatched) {
      return NextResponse.json(
        { error: { message: 'Invalid credentials!' } },
        {
          status: 400,
        },
      );
    }

    const userWithId = replaceMongoIdInObject(user) as IUser;

    // TODO: Generate access and refresh token
    const accessToken = generateToken(
      { id: userWithId.id },
      envConfig.jwt.secret as Secret,
      envConfig.jwt.access_token_expire_in as string,
    );

    const refreshToken = generateToken(
      { id: userWithId.id },
      envConfig.jwt.secret as Secret,
      envConfig.jwt.redresh_token_expire_in as string,
    );

    return NextResponse.json(
      {
        user: {
          id: userWithId.id,
          email: userWithId.email,
          name: userWithId.name,
          image: userWithId.image,
        },
        backendTokens: {
          accessToken,
          refreshToken,
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
