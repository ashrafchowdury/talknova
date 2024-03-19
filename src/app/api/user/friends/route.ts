import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    const friendsId = await prisma.friends.findMany({
      where: { friendId: session?.user.id as string },
      select: {
        user: {
          select: {
            id: true,
            bio: true,
            name: true,
            image: true,
          },
        },
      },
    });

    const friends = friendsId?.map((user) => user.user);

    return NextResponse.json(friends, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Encounter error while trying to get friends data." },
      { status: 400 }
    );
  }
}
