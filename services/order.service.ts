/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from '../config/dbConfig';
import Cart from '../models/cart.model';
import Order from '../models/order.model';
import Product from '../models/product.model';
import { Order as IOrder } from '../types/index';

export const generateInvoiceId = async () => {
  await dbConnect();
  const totalOrders = await Order.find({}).countDocuments();
  const year = new Date().getFullYear();
  return `${year}${totalOrders + 1}`;
};

//userId: string, payload: Partial<IOrder>
export const createOrder = async (
  invoiceId: string,
  userId: string,
  payload: Partial<IOrder>,
) => {
  try {
    const orderCreateObj = {
      ...payload,
      invoiceId,
      invoiceDate: new Date(),
      invoiceUrl: `/uploads/invoices/${invoiceId}.pdf`,
      user: userId,
    };

    const result: IOrder = await Order.create(orderCreateObj);

    // Todo: Delete from user carts
    await Cart.deleteMany({ user: userId });

    const productAndQuantities = result.orderItems.map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }));

    // TODO: Update product sold counts
    const updatePromises = productAndQuantities.map(async (pdqty) => {
      const product = await Product.findById(pdqty.product);
      if (product) {
        product.soldCounts += pdqty.quantity;
        await product.save();
      }
    });
    await Promise.all(updatePromises);

    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};
