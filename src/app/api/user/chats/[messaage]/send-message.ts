import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const chatUserId = params.slug;
    const { message, medias, quote } = (await req.json()) as {
      message: string;
      medias: { url: string[]; type: string };
      quote?: string; // quote message id
    };
    const { user }: any = await auth();

    // Find the chat using connectId
    const chat = await prisma.chat.findFirst({
      where: {
        connectId: `${chatUserId + user.id + process.env.CHAT_SECRET_ID}`,
      },
    });

    if (!chat) {
      throw new Error("Chat not found");
    }

    // Create new message
    const newMessage = await prisma.messages.create({
      data: {
        chat: { connect: { id: chat.id } },
        message: message,
        quote: quote,
        ...(medias.type
          ? {
              media: {
                create: { url: medias.url, type: medias.type },
              },
            }
          : {}),
      },
      include: {
        media: true,
      },
    });

    return NextResponse.json({ data: newMessage }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to get user chats, please again try later" },
      { status: 400 }
    );
  }
}
