import { NextResponse, NextRequest } from "next/server";
import { ratelimit } from "@/lib/ratelimte";
import { headers } from "next/headers";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("next-auth.session-token");

  if (path.includes("/api/auth/providers")) {
    try {
      const limit = await ratelimit.auth(request);

      if (limit >= 5) {
        throw new Error("429 too many requests");
      }

      return NextResponse.next();
    } catch (error) {
      return NextResponse.json(
        "Too many requests. Please try again after 5 minutes",
        { status: 429 }
      );
    }
  }

  if (path.includes("/api/user/") && !token) {
    return NextResponse.json("Unothorized request", { status: 400 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/auth/providers",
    "/api/user/friends",
    "/api/user/friends/:settings*",
    "/api/user/requests",
    "/api/user/settings",
    "/api/user/chats/:messaage*",
    "/api/file",
    "/api/file/upload",
    "/api/file/trigger",
    "/api/users",
  ],
};
