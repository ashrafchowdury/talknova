import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    const allFriends = await prisma.user.findFirst({
      where: { id: session?.user.id as string },
      select: { friends: true },
    });

    return NextResponse.json({ data: allFriends }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Encounter error while trying to get friends data." },
      { status: 400 }
    );
  }
}
