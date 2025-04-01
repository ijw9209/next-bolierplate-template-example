import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const accessToken = token?.accessToken;

  if (!(request.nextUrl.pathname === '/login')) {
    if (!accessToken) {
      const url = new URL('/login', request.url);
      return NextResponse.redirect(url);
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'], //'/((?!api).*)'
  pages: {
    pages: {
      signIn: '/login',
    },
  },
};
