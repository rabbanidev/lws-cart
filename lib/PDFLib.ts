/* eslint-disable @typescript-eslint/no-explicit-any */
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import { CommonAddress, Order, OrderItem } from '../types/index';
import numberFixed from '../utils/numberFixed';
import path from 'path';

export const createPDF = async (invoiceId: string, jsonData: Order) => {
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  const page = pdfDoc.addPage();
  const { height } = page.getSize();

  PDFHeader(page, height, timesRomanFont, invoiceId);
  PDFShipping(page, height, timesRomanFont, jsonData.address?.shipping);
  PDFDelivery(page, height, timesRomanFont, jsonData.address?.shipping);
  PDFItems(page, height, timesRomanFont, jsonData.orderItems);

  PDFOrderSummary(
    page,
    height,
    timesRomanFont,
    jsonData.subTotal,
    jsonData.shipping,
    jsonData.total,
  );

  const filePath = path.join(
    process.cwd(),
    `public/uploads/invoices/${invoiceId}.pdf`,
  );

  fs.writeFileSync(
    filePath,
    // `./public/uploads/invoices/${invoiceId}.pdf`,
    await pdfDoc.save(),
  );
};

const PDFHeader = async (
  page: any,
  height: number,
  timesRomanFont: any,
  invoiceId: string,
) => {
  page.drawText('LWSKART', {
    x: 50,
    y: height - 90,
    size: 30,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  page.drawText('Invoice:', {
    x: 50,
    y: height - 110,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(`#${invoiceId}`, {
    x: 90,
    y: height - 110,
    size: 10,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText('Date:', {
    x: 50,
    y: height - 130,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDay()}`,
    {
      x: 80,
      y: height - 130,
      size: 10,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    },
  );

  page.drawText('1234 Main Street', {
    x: 460,
    y: height - 80,
    size: 10,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText('Gulshan Dhaka', {
    x: 460,
    y: height - 93,
    size: 10,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText('Bangladesh', {
    x: 460,
    y: height - 106,
    size: 10,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText('+8801XXXXX', {
    x: 460,
    y: height - 118,
    size: 9,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText('lwscart@gmail.com', {
    x: 460,
    y: height - 130,
    size: 10,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
};

const PDFShipping = (
  page: any,
  height: number,
  timesRomanFont: any,
  address: CommonAddress,
) => {
  page.drawText('Shipping Address', {
    x: 50,
    y: height - 190,
    size: 14,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  page.drawText(address.name, {
    x: 50,
    y: height - 210,
    size: 10,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(address.contactNumber, {
    x: 50,
    y: height - 220,
    size: 10,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(address.email, {
    x: 50,
    y: height - 230,
    size: 10,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(address.streetAddress, {
    x: 50,
    y: height - 240,
    size: 10,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(`${address.city}, ${address.country}`, {
    x: 50,
    y: height - 250,
    size: 10,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
};

const PDFDelivery = (
  page: any,
  height: number,
  timesRomanFont: any,
  address: CommonAddress,
) => {
  page.drawText('Delivery Address', {
    x: 300,
    y: height - 190,
    size: 14,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(address.name, {
    x: 300,
    y: height - 210,
    size: 10,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(address.contactNumber, {
    x: 300,
    y: height - 220,
    size: 10,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(address.email, {
    x: 300,
    y: height - 230,
    size: 10,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(address.streetAddress, {
    x: 300,
    y: height - 240,
    size: 10,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(`${address.city}, ${address.country}`, {
    x: 300,
    y: height - 250,
    size: 10,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
};

const PDFItems = (
  page: any,
  height: number,
  timesRomanFont: any,
  orderItems: OrderItem[],
) => {
  page.drawText('All Products', {
    x: 50,
    y: height - 320,
    size: 14,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  PDFItemHeader(page, height, timesRomanFont);

  const startingY = height - 360;
  for (let i = 0; i < orderItems.length; i++) {
    const item = orderItems[i];
    PDFItem(page, startingY, i, timesRomanFont, item);
  }
};

const PDFItemHeader = (page: any, height: number, timesRomanFont: any) => {
  page.drawText('SL', {
    x: 50,
    y: height - 340,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText('Description', {
    x: 80,
    y: height - 340,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText('Unit Price', {
    x: 220,
    y: height - 340,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText('Quantity', {
    x: 300,
    y: height - 340,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText('Size', {
    x: 370,
    y: height - 340,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText('Color', {
    x: 420,
    y: height - 340,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText('Price', {
    x: 480,
    y: height - 340,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
};

const PDFItem = async (
  page: any,
  startingY: number,
  index: number,
  timesRomanFont: any,
  item: OrderItem,
) => {
  page.drawText(`${index + 1}`, {
    x: 50,
    y: startingY - index * 20,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(item.product.name.slice(0, 20), {
    x: 80,
    y: startingY - index * 20,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(`$${numberFixed(item.product.price, 2)}`, {
    x: 220,
    y: startingY - index * 20,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(`${item.quantity}`, {
    x: 315,
    y: startingY - index * 20,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(item.selectedSize.title, {
    x: 370,
    y: startingY - index * 20,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(item.selectedColor.title, {
    x: 420,
    y: startingY - index * 20,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(`$${numberFixed(item.subTotal, 2)}`, {
    x: 480,
    y: startingY - index * 20,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
};

const PDFOrderSummary = (
  page: any,
  height: number,
  timesRomanFont: any,
  subTotal: number,
  shipping: number = 0,
  total: number,
) => {
  page.drawText(`Sub Total`, {
    x: 420,
    y: height - 6 * 82,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(`$${numberFixed(subTotal, 2)}`, {
    x: 470,
    y: height - 6 * 82,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Shipping`, {
    x: 420,
    y: height - 6 * 82 - 20,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(`$${numberFixed(shipping, 2)}`, {
    x: 470,
    y: height - 6 * 82 - 20,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Total`, {
    x: 420,
    y: height - 6 * 82 - 40,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(`$${numberFixed(total, 2)}`, {
    x: 470,
    y: height - 6 * 82 - 40,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
};
