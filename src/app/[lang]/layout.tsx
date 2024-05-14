import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import TopNavbar from '@/components/shared/TopNavbar';
import { Locale } from '@/i18n.config';
import Navbar from '@/components/shared/Navbar';

import '../globals.css';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'bn' }];
}

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ecommerce Tailwind',
  description: '',
};

export default function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang={lang}>
      <body className={inter.className}>
        <TopNavbar />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
