import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/admin/:path*", "/parking/:path*"],
};

export function middleware(request: NextRequest) {
  const role = request.cookies.get("role")?.value; // 'Owner' or 'Driver'
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value == "true";

  const pathname = request.nextUrl.pathname;

  const isRestrictedPath = pathname.startsWith("/admin");

  // Block access to admin routes unless logged in
  if (!isLoggedIn && isRestrictedPath) {
    console.log(
      "Unauthenticated access to restricted area, redirecting to /login"
    );
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // "driver trying to access admin route, redirecting to /parking"
  if (role === "Driver" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/parking", request.url));
  }

  // "Admin trying to access driver route, redirecting to /admin/bookings"
  if (role === "Owner" && pathname.startsWith("/parking")) {
    return NextResponse.redirect(new URL("/admin/bookings", request.url));
  }

  return NextResponse.next();
}
