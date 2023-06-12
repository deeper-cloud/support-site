import type { NextRequest } from "next/server";
import { incrementPageView } from "./model/page";

export async function middleware(request: NextRequest) {
  await incrementPageView(request.nextUrl.pathname);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/questions/:pageId"],
};
