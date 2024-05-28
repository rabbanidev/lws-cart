import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import TopNavbar from '@/components/shared/TopNavbar';
import { Locale } from '@/i18n.config';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { ToastContainer } from 'react-toastify';

import '../globals.css';
import 'react-toastify/dist/ReactToastify.css';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'bn' }];
}

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ecommerce Tailwind',
  description: '',
};

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
