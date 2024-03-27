import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import redis from "@/lib/redis";

// Get all users
export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user.id) {
      return NextResponse.json(
        { error: "Unothorized request" },
        { status: 400 }
      );
    }

    const isUsersExistOnCache = await redis.json.get("all-users");

    if (isUsersExistOnCache) {
      return NextResponse.json({ data: isUsersExistOnCache }, { status: 200 });
    }

    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        bio: true,
        createdAt: true,
      },
    });

    await redis.json.set("all-users", "$", allUsers);
    await redis.expire("all-users", 9000);

    return NextResponse.json({ data: allUsers }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong on the system, please again try later" },
      { status: 400 }
    );
  }
}
