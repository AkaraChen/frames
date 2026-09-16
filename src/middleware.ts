import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/index.html" || pathname === "/index") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (pathname === "/canvas.html") {
    return NextResponse.redirect(new URL("/canvas", request.url));
  }

  const htmlFw = pathname.match(/^\/framework-([a-z0-9-]+)\.html$/);
  if (htmlFw) {
    return NextResponse.redirect(new URL(`/framework-${htmlFw[1]}`, request.url));
  }

  const pretty = pathname.match(/^\/framework-([a-z0-9-]+)$/);
  if (pretty) {
    const url = request.nextUrl.clone();
    url.pathname = `/framework/${pretty[1]}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/index",
    "/index.html",
    "/canvas.html",
    "/framework-:slug",
    "/framework-:slug.html",
  ],
};
