import dbConnect from '../config/dbConfig';
import User from '../models/user.model';
import { User as IUser } from '../types/index';

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  await dbConnect();

  return await User.findOne({ email }).lean();
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  await dbConnect();
  return await User.findById(id).lean();
};

export const updateUser = async (id: string, payload: Partial<IUser>) => {
  await dbConnect();

  const user = await User.findByIdAndUpdate(id, { ...payload }, { new: true });

  return user;
};
