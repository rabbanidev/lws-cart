import dbConnect from '../config/dbConfig';
import Color from '../models/color.model';
import Review from '../models/review.model';
import Size from '../models/size.model';
import User from '../models/user.model';
import Product from '../models/product.model';
import { Product as IProduct, ProductFilters } from '../types/index';
import { replaceMongoIdInArray, replaceMongoIdInObject } from '../utils/mongo';
import Category from '../models/category.model';

export const getProducts = async (filters: ProductFilters) => {
  try {
    await dbConnect();

    const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;

    const andConditions = [];

    // TODO: Search implementation
    if (searchTerm) {
      andConditions.push({
        $or: ['name', 'brand'].map((field) => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      });
    }

    // TODO: min and max price filters
    if (minPrice) {
      andConditions.push({
        price: {
          $gte: minPrice || 0,
        },
      });
    }
    if (maxPrice) {
      andConditions.push({
        price: {
          $lte: maxPrice || Infinity,
        },
      });
    }

    // TODO: Filters implementation
    if (Object.keys(filtersData).length > 0) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, values]) => {
          return {
            [field]: { $in: values },
          };
        }),
      });
    }

    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};

    // TODO: Below Model call for populate
    await Color.find({});
    await Size.find({});
    await Review.find({});
    await User.find({});
    await Category.find({});

    const products: IProduct[] = await Product.find(whereConditions)
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

export const getTrendingProducts = async () => {
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
        soldCounts: 'desc',
      })
      .limit(8)
      .lean();

    return replaceMongoIdInArray(products);
  } catch (error) {
    return error;
  }
};

export const getNewArrivalProducts = async () => {
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
      .limit(4)
      .lean();

    return replaceMongoIdInArray(products);
  } catch (error) {
    return error;
  }
};

export const getProduct = async (id: string) => {
  try {
    await dbConnect();

    // TODO: Below Model call for populate
    await Color.find({});
    await Size.find({});
    await Review.find({});
    await User.find({});
    await Category.find({});

    const product = await Product.findById(id)
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

    return replaceMongoIdInObject(product) || null;
  } catch (error) {
    return error;
  }
};

export const getRelatedProducts = async (id: string) => {
  try {
    await dbConnect();

    // TODO: Below Model call for populate
    await Color.find({});
    await Size.find({});
    await Review.find({});
    await User.find({});
    await Category.find({});

    const product = (await Product.findById(id)) as IProduct;

    const products = await Product.find({
      categories: { $in: product.categories },
    })
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
      .limit(5)
      .lean();

    const relatedProducts = replaceMongoIdInArray(products) as IProduct[];
    return relatedProducts.filter((pd) => pd.id !== id);
  } catch (error) {
    return error;
  }
};
