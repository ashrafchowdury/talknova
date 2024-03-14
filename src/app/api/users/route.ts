import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

import { User as NextAuthUser } from "next-auth";
import { User as PrismaUser } from "@prisma/client";

export type CustomUser = NextAuthUser & PrismaUser;

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
      select: {
        id: true,
        name: true,
        image: true,
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
