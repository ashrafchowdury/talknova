import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Reject user invitation
export async function DELETE(req: NextRequest) {
  try {
    const { invitedUserId } = await req.json();
    const user: any = await auth();

    if (!user) {
      return NextResponse.json(
        { error: "Unothorized request" },
        { status: 400 }
      );
    }

    const deleteInvitation = await prisma.requests.deleteMany({
      where: { requestId: invitedUserId },
    });

    return NextResponse.json({ data: deleteInvitation }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to reject friend request, please again try later" },
      { status: 400 }
    );
  }
}
