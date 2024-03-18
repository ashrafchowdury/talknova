import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Get all user invitations
export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    const query = {
      user: {
        select: {
          id: true,
          name: true,
          bio: true,
          createdAt: true,
          image: true,
        },
      },
    };

    const getReceivedRequests = await prisma.requestsRecievedBy.findMany({
      where: { userId: session?.user.id as string },
      select: { ...query },
    });

    const getSenedRequests = await prisma.requestsSentBy.findMany({
      where: { userId: session?.user.id as string },
      select: { ...query, requestId: true },
    });

    return NextResponse.json(
      {
        received: getReceivedRequests,
        send: getSenedRequests,
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
    const { invitedUserId } = await req.json();
    const session = await auth();

    await prisma.requestsRecievedBy.create({
      data: {
        userId: invitedUserId,
        requestId: session?.user.id as string,
      },
    });

    await prisma.requestsSentBy.create({
      data: {
        userId: session?.user.id as string,
        requestId: invitedUserId,
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
    const { requestedUserId } = await req.json();
    const session = await auth();
    const userId = session?.user.id as string;

    // add new firend on my friend list
    await prisma.friends.create({
      data: {
        userId: userId,
        friendId: requestedUserId,
      },
    });

    // add new firend on user friend list
    await prisma.friends.create({
      data: {
        userId: requestedUserId,
        friendId: userId,
      },
    });

    // remove inviter from my list
    await prisma.requestsRecievedBy.deleteMany({
      where: { userId, requestId: requestedUserId },
    });

    await prisma.requestsSentBy.deleteMany({
      where: { userId: requestedUserId, requestId: session?.user.id as string },
    });

    const updatedUserFriends = await prisma.user.findFirst({
      where: { id: userId },
      select: { friends: true },
    });

    return NextResponse.json({ data: updatedUserFriends }, { status: 201 });
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
    const { requestedUserId, type } = await req.json();
    const session = await auth();

    if (!session?.user.id) {
      return NextResponse.json(
        { error: "Unothorized request" },
        { status: 400 }
      );
    }
    const userRequest = await prisma.requestsRecievedBy.findFirst({
      where: { userId: requestedUserId, requestId: session.user.id },
    });
    const myRequestList = await prisma.requestsRecievedBy.findFirst({
      where: { userId: session.user.id, requestId: requestedUserId },
    });
    console.log("userRequest", userRequest);
    console.log("myRequestList", myRequestList);
    // if (type === "cancel") {
    //   const tryf = await prisma.requestsRecievedBy.delete({
    //     where: { id: "", userId: requestedUserId, requestId: session.user.id },
    //   });
    //   console.log(tryf);
    //   await prisma.requestsSentBy.deleteMany({
    //     where: { userId: session.user.id, requestId: requestedUserId },
    //   });
    // } else {
    //   await prisma.requestsRecievedBy.deleteMany({
    //     where: { userId: session.user.id, requestId: requestedUserId },
    //   });

    //   await prisma.requestsSentBy.deleteMany({
    //     where: { userId: requestedUserId, requestId: session.user.id },
    //   });
    // }

    return NextResponse.json("Request rejected successfully", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to reject friend request, please again try later" },
      { status: 400 }
    );
  }
}