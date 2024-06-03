import TopNavbar from '@/components/shared/TopNavbar';
import { Locale } from '@/i18n.config';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import AuthUpdate from '@/components/auth/AuthUpdate';

export default async function LanguageLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const session = await auth();

  return (
    <SessionProvider>
      {session && <AuthUpdate session={session} />}
      <TopNavbar lang={lang} />
      <Navbar lang={lang} />
      <main>{children}</main>
      <Footer lang={lang} />
    </SessionProvider>
  );
}
