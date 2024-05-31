import dbConnect from '../config/dbConfig';
import Size from '../models/size.model';
import { Size as ISize } from '../types/index';
import { replaceMongoIdInArray } from '../utils/mongo';

export const getSizes = async (): Promise<ISize[] | []> => {
  await dbConnect();

  const sizes: ISize[] = await Size.find().lean();

  return replaceMongoIdInArray(sizes);
};
