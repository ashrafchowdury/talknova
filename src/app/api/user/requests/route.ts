import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Get all user invitations
export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    const all_invitations = await prisma.user.findFirst({
      where: { id: session?.user.id as string },
      select: { requests: true },
    });

    return NextResponse.json({ data: all_invitations }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to fetch friend requests, please again try later" },
      { status: 400 }
    );
  }
}
