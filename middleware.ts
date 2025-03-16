// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

export function middleware(request: NextRequest) {
  const guestId = request.cookies.get("guestId");
  if (!guestId) {
    const newGuestId = uuidv4();
    const response = NextResponse.next();
    response.cookies.set("guestId", newGuestId, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
