import dbConnect from '../config/dbConfig';
import Address from '../models/address.model';
import { Address as IAddress } from '../types/index';

export const createOrUpdateAddress = async (
  userId: string,
  payload: Partial<IAddress>,
) => {
  await dbConnect();

  const alreadyAddress = await Address.findOne({
    user: userId,
  }).lean();

  if (alreadyAddress) {
    const address = await Address.findOneAndUpdate(
      { user: userId },
      { ...payload },
      { new: true },
    );

    return address;
  } else {
    const address = await Address.create({
      ...payload,
      user: userId,
    });
    return address;
  }
};

export const getAddressByUserId = async (userId: string) => {
  await dbConnect();

  const address = await Address.findOne({
    user: userId,
  }).lean();

  return address;
};
