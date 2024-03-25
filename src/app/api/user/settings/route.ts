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
        accounts: { select: { provider: true } },
      },
    });

    return NextResponse.json(currentUserInfo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to get user data, please again try later" },
      { status: 400 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const data = await req.json();

    const updateUserData = await prisma.user.update({
      where: { id: session?.user.id as string },
      data: { ...data },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        image: true,
        createdAt: true,
        _count: { select: { friends: true } }, // number of friends & requests count
        accounts: { select: { provider: true } },
      },
    });

    return NextResponse.json(updateUserData, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Encounter error while trying to update profile.",
      },
      { status: 400 }
    );
  }
}
