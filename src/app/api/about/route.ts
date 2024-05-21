import dbConnect from '../../../../config/dbConfig';
import Product from '../../../../models/product.model';
import Category from '../../../../models/category.model';
import Color from '../../../../models/color.model';
import Size from '../../../../models/size.model';
import Review from '../../../../models/review.model';
import User from '../../../../models/user.model';

export async function GET() {
  await dbConnect();
  await Category.find();
  await Color.find({});
  await Size.find({});
  await Review.find({});
  await User.find({});
  await Category.find({});

  const products = await Product.find({
    // categories: {
    //   $in: ['664b36c820a6ecee354340e3'],
    // },
    // sizes: {
    //   $in: ['664b458220a6ecee355d0094'],
    // },
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
    .lean();

  return Response.json({ products });
}
