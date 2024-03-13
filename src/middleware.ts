import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const user = await auth();

  if (!user) {
    return NextResponse.json({ error: "Unothorized request" }, { status: 400 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    {
      source: "/api/settings/*",
      missing: [{ type: "cookie", key: "session" }],
    },
    {
      source: "/api/user/*",
      missing: [{ type: "cookie", key: "session" }],
    },
  ],
};
