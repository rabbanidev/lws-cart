import { NextResponse } from 'next/server';
import { i18n } from '@/i18n.config';
import type { NextRequest } from 'next/server';
import { getLocale } from '../utils/getLocale';
import { getLanguageFromURL, removeLanguagePrefix } from '../utils/url';
import { loggedInRoutes, loggedOutRoutes } from '../constants';
import { cookies } from 'next/headers';

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const cookieStore = cookies();
  const lang = getLanguageFromURL(pathname);
  const actualPathname = removeLanguagePrefix(pathname);

  const token =
    cookieStore.get('__Secure-authjs.session-token') ||
    cookieStore.get('authjs.session-token');

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
    !token?.value &&
    loggedInRoutes.some((path) => actualPathname.startsWith(path))
  ) {
    return NextResponse.redirect(
      new URL(`/${lang}/login?next=${pathname}`, request.nextUrl),
    );
  } else if (
    token?.value &&
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

// import { NextResponse } from 'next/server';
// import { i18n } from '@/i18n.config';
// import type { NextRequest } from 'next/server';
// import { getLocale } from '../utils/getLocale';
// import { getLanguageFromURL, removeLanguagePrefix } from '../utils/url';
// import { loggedInRoutes, loggedOutRoutes } from '../constants';
// import { parse } from 'cookie';
// import envConfig from '../config/envConfig';
// import { cookies } from 'next/headers';

// export const middleware = async (request: NextRequest) => {
//   const { pathname } = request.nextUrl;
//   const lang = getLanguageFromURL(pathname);
//   const actualPathname = removeLanguagePrefix(pathname);

//   const cookie = parse(request.headers.get('cookie') || '');
//   const token2 =
//     cookie['authjs.session-token'] || cookie['__Secure-authjs.session-token'];

// const cookieStore = cookies();
// const token =
//   cookieStore.get('__Secure-authjs.session-token') ||
//   cookieStore.get('authjs.session-token');

//   // Enhanced logging for debugging
//   // console.log('Environment Variables:', process.env);
//   console.log('envConfig.auth.secret:', envConfig.auth.secret);
//   console.log('token2:', token2);
//   console.log('token3:', token);
//   console.log('custom-cookie:', cookieStore.get('custom-cookie'));
//   console.log('all-cookie:', cookieStore.getAll());

//   const pathNameIsMissingLocale = i18n.locales.every(
//     (locale) =>
//       !pathname.startsWith(`/${locale}`) && !pathname.startsWith(`/${locale}/`),
//   );

//   if (pathNameIsMissingLocale) {
//     const locale = getLocale(request);
//     return NextResponse.redirect(
//       new URL(`/${locale}/${pathname}`, request.nextUrl),
//     );
//   }

//   if (
//     !token?.value &&
//     loggedInRoutes.some((path) => actualPathname.startsWith(path))
//   ) {
//     return NextResponse.redirect(
//       new URL(`/${lang}/login?next=${pathname}`, request.nextUrl),
//     );
//   } else if (
//     token?.value &&
//     loggedOutRoutes.some((path) => actualPathname.startsWith(path))
//   ) {
//     return NextResponse.redirect(new URL(`/${lang}/account`, request.nextUrl));
//   }

//   return NextResponse.next();
// };

// export const config = {
//   matcher: ['/((?!api|assets|.*\\..*|_next).*)'],
// };
