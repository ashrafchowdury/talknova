import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Accept user invitation
export async function POST(req: NextRequest) {
  try {
    const { invitedUserId } = await req.json();
    const user: any = await auth();

    // add new firend on my friend list
    await prisma.friends.create({
      data: {
        user: { connect: { id: user.id } },
        userId: user.id,
        friendId: invitedUserId,
      },
    });

    // add new firend on user friend list
    await prisma.friends.create({
      data: {
        user: { connect: { id: invitedUserId } },
        userId: invitedUserId,
        friendId: user.id,
      },
    });

    // remove inviter from my list
    await prisma.requests.deleteMany({
      where: { requestId: invitedUserId },
    });

    const updatedUserFriends = await prisma.user.findFirst({
      where: { id: user.id },
      select: { requests: true, friends: true },
    });

    return NextResponse.json({ data: updatedUserFriends }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to accept friend request, please try later" },
      { status: 400 }
    );
  }
}
