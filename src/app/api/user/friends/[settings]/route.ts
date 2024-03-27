import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const friendId = params.slug;

    const friendsInfo = await prisma.user.findUnique({
      where: { id: friendId },
      select: {
        name: true,
        bio: true,
        image: true,
        createdAt: true,
        _count: { select: { friends: true } }, // number of friends
      },
    });

    return NextResponse.json({ data: friendsInfo }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong. Unable to access user data!" },
      { status: 500 }
    );
  }
}
