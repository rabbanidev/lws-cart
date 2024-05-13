import { NextResponse } from 'next/server';
import { i18n } from '@/i18n.config';
import { getLocale } from '@/utils/getLocale';
import type { NextRequest } from 'next/server';

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const pathNameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}`) && !pathname.startsWith(`/${locale}/`),
  );

  // Redirect if there is no locale
  if (pathNameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.nextUrl),
    );
  }

  return NextResponse.next();
};

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
