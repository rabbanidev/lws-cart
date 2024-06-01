import TopNavbar from '@/components/shared/TopNavbar';
import { Locale } from '@/i18n.config';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

export default async function LanguageLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <>
      <TopNavbar lang={lang} />
      <Navbar lang={lang} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
