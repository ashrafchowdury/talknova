import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import redis from "@/lib/redis";

export async function GET() {
  try {
    const session = await auth();

    const isFriendsExistOnCache = await redis.json.get(
      `${session?.user.id}:friends`
    );

    if (isFriendsExistOnCache) {
      return NextResponse.json(isFriendsExistOnCache, { status: 200 });
    }

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

    // cache data
    await redis.json.set(
      `${session?.user.id}:friends`,
      "$",
      JSON.stringify(friends)
    );
    await redis.expire(`${session?.user.id}:friends`, 900);

    return NextResponse.json(friends, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Encounter error while trying to get friends data." },
      { status: 400 }
    );
  }
}
