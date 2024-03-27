import React from "react";
import { Button, Popover, PopoverTrigger, PopoverContent } from "@/packages/ui";
import { EllipsisVertical } from "lucide-react";
import { User } from "@/lib/types";
import { Chats } from "../user/page";
import { cn } from "@/lib/functions";

const reactions = [
  { react: "💘", title: "love" },
  { react: "😔", title: "sad" },
  { react: "🥳", title: "celebrate" },
  { react: "👎", title: "down" },
];

const MessageMenu = ({
  user,
  chat,
  deleteMessage,
  setMsgReply,
  addReaction,
  isMainUser,
}: {
  user: User;
  chat: Chats;
  deleteMessage: any;
  setMsgReply: any;
  addReaction: any;
  isMainUser: boolean;
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button size="icon" variant="ghost" className="w-7 h-7">
          <EllipsisVertical className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0" align="start">
        <section>
          <button
            className="text-sm text-start w-full py-2 px-4 hover:bg-secondary duration-200"
            onClick={() =>
              setMsgReply({
                message: chat.message,
                messageId: chat.id,
              })
            }
          >
            Reply message
          </button>

          {isMainUser && (
            <button
              className="text-sm text-start w-full py-2 px-4 hover:bg-secondary duration-200 text-red-500"
              onClick={() => deleteMessage(user.id, [chat.id])}
            >
              Delete message
            </button>
          )}

          <div className="flex items-center justify-between mt-3 px-4 py-1 border-t">
            {reactions.map((item) => (
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "w-7 h-7 text-xl",
                  item.title == chat.reaction && "border bg-secondary"
                )}
                onClick={() =>
                  addReaction(
                    user.id,
                    chat.id,
                    chat.reaction == item.title ? null : item.title
                  )
                }
              >
                {item.react}
              </Button>
            ))}
          </div>
        </section>
      </PopoverContent>
    </Popover>
  );
};

export default MessageMenu;
