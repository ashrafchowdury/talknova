import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
const session = await auth();
    const data = await req.json();

    const updateUserData = await prisma.user.update({
      where: { id: session?.user.id as string },
      data: { ...data },
    });

    return NextResponse.json({ data: updateUserData }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Encounter error while trying to update profile, please again try later",
      },
      { status: 400 }
    );
  }
}
