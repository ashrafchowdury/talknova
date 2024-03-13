import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

import prisma from "@/lib/prisma";

// Get all users
export async function GET() {
  try {
    const user: any = await auth();

    if (!user.id) {
      return NextResponse.json(
        { error: "Unothorized request" },
        { status: 400 }
      );
    }

    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        avatar: true,
        bio: true,
      },
    });

    return NextResponse.json({ data: allUsers }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong on the system, please again try later" },
      { status: 400 }
    );
  }
}
