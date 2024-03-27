import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const connectionId = (
  userId: string | unknown,
  chatUserId: string
): string => {
  return [userId, chatUserId].sort().join("");
};

export async function GET(
  req: NextRequest,
  { params }: { params: { messaage: string } }
) {
  try {
    const chatUserId = params.messaage;
    const session = await auth();

    const all_chats = await prisma.messages.findMany({
      where: {
        chat: {
          connectionId: connectionId(session?.user.id, chatUserId),
        },
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
  { params }: { params: { messaage: string } }
) {
  try {
    const chatUserId = params.messaage;
    const { message, medias, quote } = (await req.json()) as {
      message: string;
      medias: { url: string[]; type: string };
      quote?: string; // quote message id
    };
    const session = await auth();

    if (!message) {
      throw new Error("Chat not found");
    }

    let createMessage;

    const newMessage = await prisma.messages.create({
      data: {
        chat: {
          connect: {
            connectionId: connectionId(session?.user.id, chatUserId),
          },
        },
        message: message,
        senderId: session?.user.id as string,
        quote,
      },
    });
    createMessage = newMessage;

    // const newChat = await prisma.chat.create({
    //   data: {
    //     connectionId: connectionId(session?.user.id, chatUserId),
    //     messages: {
    //       create: {
    //         message: message,
    //         senderId: session?.user.id as string,
    //         quote,
    //       },
    //     },
    //   },
    //   include: { messages: true },
    // });
    // createMessage = newChat.messages[0];

    return NextResponse.json(createMessage, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to get user chats, please again try later" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { messaage: string } }
) {
  try {
    const chatUserId = params.messaage;
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
