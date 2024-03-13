import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const chatUserId = params.slug;
    const { messageIds } = (await req.json()) as { messageIds: string[] };
    const { user }: any = await auth();

    await prisma.messages.deleteMany({
      where: {
        id: { in: messageIds },
        chat: {
          connectId: `${chatUserId + user.id + process.env.CHAT_SECRET_ID}`,
        },
      },
    });

    // Get updated messages list
    // const updatedMessages = await prisma.messages.findMany({
    //   where: {
    //     chat: {
    //       connectId: `${chatUserId + user.id + process.env.CHAT_SECRET_ID}`,
    //     },
    //   },
    // });

    return NextResponse.json(
      { data: "messages got deleted successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to get user chats, please again try later" },
      { status: 400 }
    );
  }
}
