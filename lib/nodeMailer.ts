import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import envConfig from '../config/envConfig';
import path from 'path';

export const orderPurchaseMail = async (
  userEmail: string,
  invoiceId: string,
) => {
  const filePath = path.join(
    process.cwd(),
    `/public/uploads/invoices/${invoiceId}.pdf`,
  );

  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: 'gmail',
      auth: {
        user: envConfig.access_gmail,
        pass: envConfig.access_gmail_pass,
      },
      port: 465,
      host: 'smtp.gmail.com',
    }),
  );

  const mailOptions = {
    from: envConfig.access_gmail,
    to: [userEmail],
    subject: 'Order purchase successfully completed ✓',
    html: `<p>Thank you for your purchase order! We appreciate your business and will process your order promptly.</p>`,
    attachments: [
      {
        filename: `invoice.pdf`,
        contentType: 'application/pdf',
        path: filePath,
      },
    ],
  };

  try {
    const sendMail = await transporter.sendMail(mailOptions);
    if (sendMail) return true;
  } catch (error) {
    return false;
  }
};
