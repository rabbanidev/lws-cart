import { hashPassword } from './../../../../../../lib/bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../../../config/dbConfig';
import { getUserByEmail } from '../../../../../../services/user.service';
import { replaceMongoIdInObject } from '../../../../../../utils/mongo';
import { generateToken } from '../../../../../../lib/jwt';
import { Secret } from 'jsonwebtoken';
import envConfig from '../../../../../../config/envConfig';
import { User as IUser } from '../../../../../../types/index';
import User from '../../../../../../models/user.model';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { email, provider, name } = await request.json();

    if (!email || !provider) {
      return NextResponse.json(
        { error: { message: 'Provide are all credentials!' } },
        {
          status: 400,
        },
      );
    }

    let user = await getUserByEmail(email);

    if (!user) {
      // TODO User create
      const pass = await hashPassword(`${name}${email}${provider}`);
      const createdUser = await User.create({
        email,
        name,
        provider,
        password: pass,
      });

      user = createdUser.toObject() as IUser;
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
