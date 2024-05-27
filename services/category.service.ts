import dbConnect from '../config/dbConfig';
import Category from '../models/category.model';
import { Category as ICategory } from '../types/index';
import { replaceMongoIdInArray } from '../utils/mongo';

export const getCategories = async (): Promise<ICategory[] | []> => {
  await dbConnect();

  const categories: ICategory[] = await Category.find().lean();
  return replaceMongoIdInArray(categories);
};
