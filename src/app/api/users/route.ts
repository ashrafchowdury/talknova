import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

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

    const allUsers = await prisma.user.findMany({
      where: {
        id: { not: session?.user.id }, // Exclude the current user
      },
      select: {
        id: true,
        name: true,
        image: true,
        bio: true,
        createdAt: true,
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
