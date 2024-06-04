import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../../lib/jwt';
import envConfig from '../../../../config/envConfig';
import { Secret } from 'jsonwebtoken';
import {
  createOrder,
  generateInvoiceId,
} from '../../../../services/order.service';
import { createPDF } from '../../../../lib/PDFLib';
import { Order as IOrder } from '../../../../types/index';
import { orderPurchaseMail } from '../../../../lib/nodeMailer';
import { getUserById } from '../../../../services/user.service';
import Order from '../../../../models/order.model';
import { replaceMongoIdInObject } from '../../../../utils/mongo';

export async function POST(req: NextRequest) {
  try {
    const accessToken = headers().get('authorization')
      ? headers().get('authorization')?.split(' ')[1]
      : null;

    if (!accessToken) {
      return NextResponse.json(
        { message: 'User is not authenticated' },
        {
          status: 401,
        },
      );
    }

    const user = verifyToken(accessToken, envConfig.jwt.secret as Secret);
    const dbUser = await getUserById(user.id);

    const jsonData = (await req.json()) as IOrder;
    const invoiceId = await generateInvoiceId();

    await createPDF(invoiceId, jsonData);

    const order = await createOrder(invoiceId, user.id, jsonData);

    if (order) {
      await orderPurchaseMail(dbUser?.email as string, invoiceId);

      const result = await Order.findOne({
        invoiceId: order.invoiceId,
      })
        .populate({
          path: 'orderItems.product',
        })
        .lean();

      return NextResponse.json(
        {
          message: 'Order created successfully.',
          order: replaceMongoIdInObject(result),
        },
        {
          status: 201,
        },
      );
    }

    return NextResponse.json(
      { message: 'Order created failed.' },
      {
        status: 400,
      },
    );
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
