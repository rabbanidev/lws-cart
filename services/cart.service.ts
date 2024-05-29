import dbConnect from '../config/dbConfig';
import Cart from '../models/cart.model';
import Color from '../models/color.model';
import Product from '../models/product.model';
import Size from '../models/size.model';
import { Cart as ICart, Color as IColor, Size as ISize } from '../types/index';
import { replaceMongoIdInArray } from '../utils/mongo';

export const addToCart = async (payload: {
  userId: string;
  productId: string;
  quantity: number;
  selectedColor: IColor;
  selectedSize: ISize;
}) => {
  await dbConnect();

  const { userId, productId, quantity, selectedColor, selectedSize } = payload;

  const product = await Product.findById(productId);

  const exitCart = await Cart.findOne({
    user: userId,
    product: productId,
  });

  if (exitCart) {
    exitCart.quantity = exitCart.quantity + quantity;
    exitCart.selectedColor = selectedColor;
    exitCart.selectedSize = selectedSize;
    exitCart.save();
  } else {
    await Cart.create({ ...payload, user: userId, product: productId });
  }

  //TODO: Stock management for product
  product.stock = product.stock - quantity;
  if (product.stock === 0) {
    product.availability = 'Out Stock';
  }

  await product.save();
};

export const getFromCarts = async (userId: string): Promise<ICart[] | []> => {
  await dbConnect();

  await Product.find();
  await Color.find();
  await Size.find();

  const carts: ICart[] = await Cart.find({
    user: userId,
  })
    .populate('product')
    .populate('selectedColor')
    .populate('selectedSize')
    .lean();

  return replaceMongoIdInArray(carts);
};
