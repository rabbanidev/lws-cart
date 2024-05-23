import { NextResponse } from 'next/server';
import { i18n } from '@/i18n.config';
import type { NextRequest } from 'next/server';
import { getLocale } from '../utils/getLocale';
import { cookies } from 'next/headers';
import { getLanguageFromURL, removeLanguagePrefix } from '../utils/url';
import { loggedInRoutes, loggedOutRoutes } from '../constants';

export const middleware = (request: NextRequest) => {
  const cookieStore = cookies();
  const { pathname } = request.nextUrl;
  const lang = getLanguageFromURL(pathname);
  const actualPathname = removeLanguagePrefix(pathname);
  const token = cookieStore.get('authjs.session-token')?.value;

  const pathNameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}`) && !pathname.startsWith(`/${locale}/`),
  );

  //TODO: Redirect if there is no locale
  if (pathNameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.nextUrl),
    );
  }

  // TODO: private and public route handle
  if (
    !token &&
    loggedInRoutes.some((path) => actualPathname.startsWith(path))
  ) {
    return NextResponse.redirect(
      new URL(`/${lang}/login?next=${pathname}`, request.nextUrl),
    );
  } else if (
    token &&
    loggedOutRoutes.some((path) => actualPathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL(`/${lang}/account`, request.nextUrl));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api)
    '/((?!api|assets|.*\\..*|_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
