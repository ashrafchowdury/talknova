import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const chatUserId = params.slug;
    const { user }: any = await auth();

    const all_chats = await prisma.messages.findMany({
      where: {
        chat: {
          connectId: `${chatUserId + user.id + process.env.CHAT_SECRET_ID}`,
        },
      },
    });

    return NextResponse.json({ data: all_chats }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to get user chats, please again try later" },
      { status: 400 }
    );
  }
}
