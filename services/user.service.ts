import dbConnect from '../config/dbConfig';
import User from '../models/user.model';
import { User as IUser } from '../types';

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  await dbConnect();

  return await User.findOne({ email });
};
