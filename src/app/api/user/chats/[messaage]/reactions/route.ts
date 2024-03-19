import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const chatUserId = params.slug;
    const { messageId, reaction } = (await req.json()) as {
      messageId: string;
      reaction: string;
    };
    const session = await auth();

    const updated_reaction = await prisma.messages.update({
      where: {
        id: messageId,
        chat: {
          connectId: `${
            chatUserId + session?.user.id + process.env.CHAT_SECRET_ID
          }`,
        },
      },
      data: {
        reaction: reaction,
      },
    });

    return NextResponse.json({ data: updated_reaction }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to get user chats, please again try later" },
      { status: 400 }
    );
  }
}
