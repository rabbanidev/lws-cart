import dbConnect from '../config/dbConfig';
import Color from '../models/color.model';
import { Color as IColor } from '../types/index';
import { replaceMongoIdInArray } from '../utils/mongo';

export const getColors = async (): Promise<IColor[] | []> => {
  await dbConnect();

  const colors: IColor[] = await Color.find().lean();

  return replaceMongoIdInArray(colors);
};
