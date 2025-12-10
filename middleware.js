import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // Allow static files, API, images etc.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  // Allow admin login page always
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Check admin token
  const admin = req.cookies.get("admin-auth")?.value;

  // If user tries any admin page but is NOT logged in → redirect
  if (pathname.startsWith("/admin") && !admin) {
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // If logged-in admin tries to open login → redirect to dashboard
  if (pathname === "/admin/login" && admin) {
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  // Allow everything else
  return NextResponse.next();
}
