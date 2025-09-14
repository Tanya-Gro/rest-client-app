import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextRequest } from 'next/server';

const privateRoutes = ['/history', '/main', '/variables', '/rest-client'];

const privatePathnameRegex = RegExp(
  `^(/(${routing.locales.join('|')}))?(${privateRoutes
    .flatMap((path) => (path === '/' ? ['', '/'] : path))
    .join('|')})/?$`,
  'i'
);

const intlMiddleware = createMiddleware(routing);

const authMiddleware = withAuth(
  function middleware(req: NextRequestWithAuth) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: '/signin',
    },
  }
);

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const pathname = req.nextUrl.pathname;
  const isPrivatePage = privatePathnameRegex.test(pathname);

  if (isPrivatePage) {
    const authResult = authMiddleware(req as NextRequestWithAuth, event);
    return authResult;
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
