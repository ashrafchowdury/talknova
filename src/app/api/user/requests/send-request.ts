import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Send a new invitation
export async function POST(req: NextRequest) {
  try {
    const { invitedUserId } = await req.json();
      const session = await auth();

    const create_new_request = await prisma.requests.create({
      data: {
        user: { connect: { id: invitedUserId } },
        userId: invitedUserId,
        requestId: session?.user.id as string,
      },
    });

    if (!create_new_request) {
      return NextResponse.json(
        {
          error:
            "Encounter error while trying to send request. Please try again later.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ data: create_new_request }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to send friend request, please again try later" },
      { status: 400 }
    );
  }
}
