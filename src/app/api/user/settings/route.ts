import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    const currentUserInfo = await prisma.user.findUnique({
      where: { id: session?.user.id as string },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        image: true,
        createdAt: true,
        _count: { select: { friends: true } }, // number of friends & requests count
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
