import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Manually check for the Better-Auth session cookie
  // Better-Auth uses '__Secure-better-auth.session_token' in production (HTTPS)
  // and 'better-auth.session_token' in development (HTTP)
  const sessionToken =
    request.cookies.get("__Secure-better-auth.session_token") ||
    request.cookies.get("better-auth.session_token");

  const isPrivateRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/blog/add") ||
    pathname.startsWith("/blog/manage");

  // 2. If it's private and there is no token value, redirect
  if (isPrivateRoute && !sessionToken?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Ensure the matcher covers everything you need
  matcher: ["/dashboard/:path*", "/blog/add/:path*", "/blog/manage/:path*"],
};
