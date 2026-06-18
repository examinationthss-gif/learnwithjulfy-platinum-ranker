import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Read session cookie safely (Supabase Auth stores tokens in sb-access-token cookies by default)
  const hasAuth = request.cookies.get("sb-access-token") || request.cookies.get("supabase-auth-token");
  const path = request.nextUrl.pathname;

  // Protected paths
  const protectedRoutes = ["/dashboard", "/notes", "/mcq", "/tests", "/leaderboard", "/videos", "/welcome"];

  const isProtected = protectedRoutes.some((route) => path.startsWith(route));

  if (isProtected && !hasAuth) {
    // If not authenticated, redirect to login page.
    // We use a query parameter to return after successful login sessions.
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", path);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/notes/:path*",
    "/mcq/:path*",
    "/tests/:path*",
    "/leaderboard/:path*",
    "/videos/:path*",
    "/welcome/:path*",
  ],
};
