import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import TopNavbar from '@/components/shared/TopNavbar';
import { Locale } from '@/i18n.config';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { ToastContainer } from 'react-toastify';

import '../globals.css';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Metadata {
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
    keywords: [],
    openGraph: {
      title: 'LWSKart | Online shopping platform',
      description:
        'Discover an unparalleled online shopping experience with LWSCart, where we bring you a wide range of high-quality products at unbeatable prices. From the latest in fashion to seasonal essentials, LWSCart is your one-stop-shop for all your needs.',
      type: 'website',
      locale: lang,
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
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang={lang}>
      <body className={inter.className}>
        <TopNavbar lang={lang} />
        <Navbar lang={lang} />
        <main>{children}</main>
        <Footer />
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
