import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { user }: any = await auth();

    const currentUserInfo = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        username: true,
        email: true,
        bio: true,
        avatar: true,
        createdAt: true,
        _count: { select: { friends: true, requests: true } }, // number of friends & requests count
      },
    });

    return NextResponse.json({ data: currentUserInfo }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to get user data, please again try later" },
      { status: 400 }
    );
  }
}
