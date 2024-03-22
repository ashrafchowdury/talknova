import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const connectionId = (userId: string | unknown, chatUserId: string): string => {
  return `${userId + chatUserId + process.env.CHAT_SECRET_ID}`
    .split("")
    .sort()
    .join("");
};

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const chatUserId = params.slug;
    const session = await auth();

    const all_chats = await prisma.messages.findMany({
      where: {
        chatId: connectionId(session?.user.id, chatUserId),
      },
    });

    return NextResponse.json(all_chats, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to get user chats, please again try later" },
      { status: 400 }
    );
  }
}

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
    const session = await auth();

    if (!message) {
      throw new Error("Chat not found");
    }

    try {
      const newMessage = await prisma.messages.create({
        data: {
          chat: {
            connect: {
              connectionId: connectionId(session?.user.id, chatUserId),
            } as any,
          },
          message: message,
          senderId: session?.user.id as string,
          quote,
        },
      });

      return NextResponse.json(newMessage, { status: 201 });
    } catch (error) {
      const newChat = await prisma.chat.create({
        data: {
          connectionId: connectionId(session?.user.id, chatUserId),
          messages: {
            create: {
              message: message,
              senderId: session?.user.id as string,
              quote,
            },
          },
        },
        include: { messages: true },
      });

      return NextResponse.json(newChat.messages[0], { status: 201 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to get user chats, please again try later" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const chatUserId = params.slug;
    const { messageIds } = (await req.json()) as { messageIds: string[] };
    const session = await auth();

    await prisma.messages.deleteMany({
      where: {
        id: { in: messageIds },
        chat: {
          connectionId: connectionId(session?.user.id, chatUserId),
        },
      },
    });

    return NextResponse.json(
      { data: "messages deleted successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to get user chats, please again try later" },
      { status: 400 }
    );
  }
}

/*  
...(medias.type
  ? {
      media: {
        create: { url: medias.url, type: medias.type },
      },
    }
  : {}),
*/
