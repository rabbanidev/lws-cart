import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import dbConnect from '../../../../../config/dbConfig';
import User from '../../../../../models/user.model';
import { hashPassword } from '../../../../../lib/bcrypt';
import { User as IUser } from '../../../../../types';
import { replaceMongoIdInObject } from '../../../../../utils/mongo';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const jsonData = await request.json();

    const exitUser = await User.findOne({ email: jsonData.email });
    if (exitUser) {
      return NextResponse.json(
        { message: 'Already register user!' },
        {
          status: 409,
        },
      );
    }

    const hashPass = await hashPassword(jsonData.password);

    const result = await User.create({
      ...jsonData,
      password: hashPass,
    });

    const createdUser = replaceMongoIdInObject(result.toObject()) as IUser;

    return NextResponse.json(
      {
        message: 'User has been created',
        data: createdUser,
      },
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
