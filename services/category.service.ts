/* eslint-disable @typescript-eslint/ban-ts-comment */
import dbConnect from '../config/dbConfig';
import Category from '../models/category.model';
import Product from '../models/product.model';
import { Category as ICategory } from '../types/index';
import { replaceMongoIdInArray } from '../utils/mongo';

export const getCategories = async (): Promise<ICategory[] | []> => {
  await dbConnect();

  let categories: ICategory[] = await Category.find().lean();

  categories = await Promise.all(
    categories.map(async (category) => {
      const totalProducts = await Product.find({
        //@ts-ignore
        categories: { $in: category._id },
      }).countDocuments();
      return {
        ...category,
        totalProducts,
      };
    }),
  );

  return replaceMongoIdInArray(categories);
};
