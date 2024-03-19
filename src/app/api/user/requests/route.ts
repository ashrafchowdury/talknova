import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Get all user invitations
export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    const selectors = {
      id: true,
      name: true,
      bio: true,
      createdAt: true,
      image: true,
    };

    const requestIds = await prisma.requests.findMany({
      where: { userId: session?.user.id as string },
      select: { requestId: true },
    });

    const userList = await prisma.user.findMany({
      where: {
        id: { in: requestIds.map((user) => user.requestId) as string[] },
      },
      select: { ...selectors },
    });

    const list = await prisma.requests.findMany({
      where: { requestId: session?.user.id as string },
      select: { user: { select: { ...selectors } } },
    });

    return NextResponse.json(
      {
        received: userList,
        send: list.map((user) => user.user),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to fetch friend requests, please again try later" },
      { status: 400 }
    );
  }
}

// Send a new invitation
export async function POST(req: NextRequest) {
  try {
    const { invitedUserId: receiverId } = await req.json();
    const session = await auth();
    const senderId = session?.user.id as string;

    await prisma.requests.create({
      data: {
        userId: receiverId,
        requestId: senderId,
      },
    });

    return NextResponse.json("Request sended successfully.", { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to send friend request, please again try later" },
      { status: 400 }
    );
  }
}

// Accept user invitation
export async function PATCH(req: NextRequest) {
  try {
    const { receiverId } = await req.json();
    const session = await auth();
    const senderId = session?.user.id as string;

    // add new firend on my friend list
    await prisma.friends.create({
      data: {
        userId: senderId,
        friendId: receiverId,
      },
    });

    // add new firend on user friend list
    await prisma.friends.create({
      data: {
        userId: receiverId,
        friendId: senderId,
      },
    });

    await prisma.requests.deleteMany({
      where: { userId: senderId, requestId: receiverId },
    });

    return NextResponse.json("New Friend added succcessfully", { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to accept friend request, please try later" },
      { status: 400 }
    );
  }
}

// Reject user invitation
export async function DELETE(req: NextRequest) {
  try {
    const { receiverId } = await req.json();
    const session = await auth();

    if (!session?.user.id) {
      return NextResponse.json(
        { error: "Unothorized request" },
        { status: 400 }
      );
    }

    await prisma.requests.deleteMany({
      where: { userId: receiverId, requestId: session.user.id },
    });

    return NextResponse.json("Request rejected successfully", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to reject friend request, please again try later" },
      { status: 400 }
    );
  }
}
