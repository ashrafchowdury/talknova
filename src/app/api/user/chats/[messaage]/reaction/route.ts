import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { connectionId } from "../route";

export async function POST(
  req: NextRequest,
  { params }: { params: { messaage: string } }
) {
  try {
    const chatUserId = params.messaage;
    const { messageId, reaction } = (await req.json()) as {
      messageId: string;
      reaction?: string;
    };
    const session = await auth();

    const updated_reaction = await prisma.messages.update({
      where: { id: messageId },
      data: {
        reaction: reaction,
      },
    });
 
    return NextResponse.json(updated_reaction, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Unable to get user chats, please again try later" },
      { status: 400 }
    );
  }
}
