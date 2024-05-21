import dbConnect from '../config/dbConfig';
import Color from '../models/color.model';
import Review from '../models/review.model';
import Size from '../models/size.model';
import User from '../models/user.model';
import Product from '../models/product.model';
import { Product as IProduct } from '../types';
import { replaceMongoIdInArray } from '../utils/mongo';
import Category from '../models/category.model';

// Trending -- sort({ soldCounts: 'desc'});
// New Arival -- sort({ createdtAt: 'desc'});

export const getProducts = async () => {
  try {
    await dbConnect();

    // TODO: Below Model call for populate
    await Color.find({});
    await Size.find({});
    await Review.find({});
    await User.find({});
    await Category.find({});

    const products: IProduct[] = await Product.find({})
      .populate({
        path: 'categories',
        select: 'name slug',
      })
      .populate({
        path: 'colors',
        select: 'name',
      })
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          select: 'name email image',
        },
      })
      .populate('sizes')
      .populate('colors')
      .sort({
        createdAt: 'desc',
      })
      .lean();

    return replaceMongoIdInArray(products);
  } catch (error) {
    return error;
  }
};