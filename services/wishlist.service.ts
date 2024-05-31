import dbConnect from '../config/dbConfig';
import Product from '../models/product.model';
import Wishlist from '../models/wishlist.model';
import { WishlistItem as IWishlistItem } from '../types/index';
import { replaceMongoIdInArray } from '../utils/mongo';

export const createOrRemoveWishlistItem = async (
  userId: string,
  productId: string,
) => {
  await dbConnect();

  const exitWishlistItem = await Wishlist.findOne({
    user: userId,
    product: productId,
  });

  if (exitWishlistItem) {
    // TODO: Remove from db
    await Wishlist.deleteOne({
      user: userId,
      product: productId,
    });
  } else {
    await Wishlist.create({
      user: userId,
      product: productId,
    });
  }
};

export const getWishlistItems = async (
  userId: string,
): Promise<IWishlistItem[] | []> => {
  await dbConnect();

  await Product.find();

  const wishlistItems: IWishlistItem[] = await Wishlist.find({
    user: userId,
  })
    .populate({
      path: 'product',
      populate: ['colors', 'sizes', 'categories'],
    })
    .lean();

  return replaceMongoIdInArray(wishlistItems);
};
