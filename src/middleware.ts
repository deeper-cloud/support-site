import type { NextRequest } from "next/server";
import { incrementPageView } from "./model/page";

export async function middleware(request: NextRequest) {
  console.log("middleware", request.nextUrl.pathname);
  //await incrementPageView(request.nextUrl.pathname);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/topics/:pageId", "/questions/:pageId"],
};
