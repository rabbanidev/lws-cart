import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export function generateMetadata(): Metadata {
  return {
    title: 'LWSKart | Online shopping platform',
    creator: 'Golam Rabbani',
    category: 'ecommerce',
    applicationName: 'LWSKart',
    authors: [
      { name: 'Golam Rabbani', url: 'https://golam-rabbani.netlify.app' },
    ],
    description:
      'Discover an unparalleled online shopping experience with LWSCart, where we bring you a wide range of high-quality products at unbeatable prices. From the latest in fashion to seasonal essentials, LWSCart is your one-stop-shop for all your needs.',
    keywords: ['men', 'women', 'kids', 'summer', 'winter'],
    openGraph: {
      title: 'LWSKart | Online shopping platform',
      description:
        'Discover an unparalleled online shopping experience with LWSCart, where we bring you a wide range of high-quality products at unbeatable prices. From the latest in fashion to seasonal essentials, LWSCart is your one-stop-shop for all your needs.',
      type: 'website',
      images: [
        {
          url: 'https://lws-cart.vercel.app/banner-bg.jpg',
          width: 1200,
          height: 600,
        },
      ],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
