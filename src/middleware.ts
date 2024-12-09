import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/admin/:path*", "/driver/:path*"],
};

export function middleware(request: NextRequest) {
  //   const role = request.cookies.get("role")?.value; // 'admin' or 'driver'
  //   const isLoggedIn = request.cookies.get("isLoggedIn")?.value == "true";
  //   const pathname = request.nextUrl.pathname;

  //   console.log(role, request.cookies.get("isLoggedIn")?.value);
  //   const isRestrictedPath =
  //     pathname.startsWith("/admin") || pathname.startsWith("/driver");

  //   // Block access to admin or driver routes unless logged in
  //   if (!isLoggedIn && isRestrictedPath) {
  //     console.log(
  //       "Unauthenticated access to restricted area, redirecting to /login"
  //     );
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }

  //   // "driver trying to access admin route, redirecting to /driver/dashboard"
  //   if (role === "driver" && pathname.startsWith("/admin")) {
  //     return NextResponse.redirect(new URL("/driver/dashboard", request.url));
  //   }

  //   // "Admin trying to access driver route, redirecting to /admin/dashboard"
  //   if (role === "admin" && pathname.startsWith("/driver")) {
  //     return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  //   }

  return NextResponse.next();
}
