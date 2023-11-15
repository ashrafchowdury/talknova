import { useRef, MutableRefObject } from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import { cn, formatMessageTime } from "@/lib/functions";
import { useUsers } from "@/packages/server/context/UserContext";
import { Avatar } from ".";
import { useAppearance } from "@/lib/hooks";
import { useEncrypt } from "@/packages/encryption";
import { UserType, MsgType } from "@/packages/server";
import { Timestamp } from "firebase/firestore";
import {
  MessageMenu,
  MessageFile,
  MessageLinkPreview,
  MessageAudio,
} from "./messages";
import { useChats } from "@/packages/server/context/ChatContext";

type MessageType = {
  data?: MsgType;
  position: "left" | "right";
  user: UserType;
};

const Message = ({ data, position, user }: MessageType) => {
  const { createChatId } = useChats();
  const { userAppearance } = useAppearance();
  const { myself } = useUsers();
  const { decryptData, isAutoLock } = useEncrypt();
  const msgPosition = position == "left";
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const fileRef: MutableRefObject<HTMLImageElement | HTMLAudioElement> = useRef(
    null!
  );

  return (
    <div
      className={cn(
        "w-full my-5",
        msgPosition ? "float-left clear-both" : "float-right clear-both"
      )}
    >
      <div
        className={cn(
          "w-auto flex items-end space-x-2 group/item",
          msgPosition && "flex-row-reverse"
        )}
      >
        <Avatar
          img={msgPosition ? myself.image : user?.image}
          fallback={msgPosition ? myself.name : user?.name}
          className="w-4 md:w-6 h-4 md:h-6 text-[7px] md:text-[9px]"
        />

        <div
          className={cn(
            "py-2 md:py-3 px-4 md:px-5 text-xs sm:text-sm md:text-[16px] rounded-lg relative flex items-center justify-center select-none",
            msgPosition
              ? "!ml-4 !mr-2 bg-border"
              : "!mr-4 bg-primary text-color",
            data?.send.files && "py-0 md:py-0 px-0 md:px-0 bg-transparent",
            data?.send.audio && "py-0 md:py-0 px-0 md:px-0 bg-transparent",
            msgPosition ? "" : userAppearance
          )}
        >
          {data?.send.audio && (
            <MessageAudio
              data={data.send.audio}
              position={msgPosition}
              fileRef={fileRef as MutableRefObject<HTMLAudioElement>}
            />
          )}
          {data?.send.files && (
            <MessageFile
              data={data.send.files}
              position={msgPosition}
              fileRef={fileRef}
            />
          )}

          {data?.send?.msg &&
          decryptData(data?.send?.msg, createChatId())?.match(urlRegex) ? (
            <MessageLinkPreview
              message={decryptData(data?.send?.msg, createChatId())}
            />
          ) : (
            <span>{decryptData(data?.send.msg as string, createChatId())}</span>
          )}
          <div
            className={cn(
              "absolute -bottom-[18px] md:-bottom-[20px] flex items-center space-x-2",
              msgPosition ? "right-1" : "-left-1"
            )}
          >
            <p className="text-[10px] sm:text-[11px] text-muted-foreground whitespace-nowrap opacity-60">
              {formatMessageTime(data?.timestemp as Timestamp)}
            </p>
            <div
              className={cn("relative", msgPosition ? "right-0" : " hidden")}
            >
              <CheckIcon
                className={cn(
                  "w-3 sm:w-4 h-3 sm:h-4",
                  data?.seen && "text-green-600"
                )}
              />
              <CheckIcon
                className={cn(
                  "w-3 sm:w-4 h-3 sm:h-4 absolute top-0 left-[4px]",
                  data?.seen && "text-green-600"
                )}
              />
            </div>
          </div>
          <MessageMenu
            data={data as MsgType}
            position={msgPosition}
            fileRef={fileRef}
          />
        </div>
      </div>
    </div>
  );
};
export default Message;
