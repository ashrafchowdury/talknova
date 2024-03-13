import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { user }: any = await auth();
    const data = await req.json();

    const updateUserData = await prisma.user.update({
      where: { id: user.id },
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
