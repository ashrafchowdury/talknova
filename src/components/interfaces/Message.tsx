import Loader from "./Loader";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  Skeleton,
} from "@/packages/ui";
import { cn } from "@/lib/functions";
import { useUsers } from "@/packages/server/context/UserContext";
import { useChats } from "@/packages/server/context/ChatContext";
import {
  TrashIcon,
  DotsVerticalIcon,
  CopyIcon,
  LoopIcon,
  CheckIcon,
  DownloadIcon,
} from "@radix-ui/react-icons";
import { Avatar, AudioMessage, LinkPreview } from ".";
import { useAppearance, useDownload } from "@/lib/hooks";
import { useEncrypt } from "@/packages/encryption";
import { UserType } from "@/packages/server/types";

type MessageType = {
  data?: any;
  position: "left" | "right";
  user: UserType;
};

const Message = ({ data, position, user }: MessageType) => {
  const { userAppearance } = useAppearance();
  const { myself } = useUsers();
  const { decryptData, isAutoLock } = useEncrypt();
  const msgPosition = position == "left";
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const fileRef: any = useRef(null);

  // Format date
  const formatTimestamp = (timestamp: any) => {
    try {
      const date = timestamp?.toDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const amOrPm = hours >= 12 ? "PM" : "AM"; // Determine AM or PM
      const formattedHours = hours % 12 || 12; // Convert to 12-hour format
      const formattedDate = `${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}/${String(date.getDate()).padStart(2, "0")} ${String(
        formattedHours
      ).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${amOrPm}`;
      return formattedDate;
    } catch (error) {
      return "";
    }
  };

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
            "py-2 md:py-3 px-4 md:px-5 text-xs sm:text-sm md:text-[16px] rounded-lg relative flex items-center justify-center",
            msgPosition
              ? "!ml-4 !mr-2 bg-border"
              : "!mr-4 bg-primary text-color",
            data.send.files && "py-0 md:py-0 px-0 md:px-0 bg-transparent",
            data.send.audio && "py-0 md:py-0 px-0 md:px-0 bg-transparent",
            msgPosition ? "" : userAppearance
          )}
        >
          {data.send.audio && (
            <AudioMessage
              data={data.send.audio}
              position={msgPosition}
              fileRef={fileRef}
            />
          )}
          {data.send.files && (
            <FileMessage
              data={data.send.files}
              position={msgPosition}
              fileRef={fileRef}
            />
          )}

          {data?.send?.msg &&
          decryptData(
            data?.send?.msg,
            [myself.uid, user?.uid].sort().join("")
          )?.match(urlRegex) ? (
            <LinkPreview
              message={
                isAutoLock
                  ? data?.send?.msg
                  : decryptData(
                      data?.send?.msg,
                      [myself.uid, user?.uid].sort().join("")
                    )
              }
            />
          ) : (
            <span>
              {isAutoLock
                ? data?.send?.msg
                : decryptData(
                    data?.send?.msg,
                    [myself.uid, user?.uid].sort().join("")
                  )}
            </span>
          )}
          <div
            className={cn(
              "absolute -bottom-[24px] flex items-center space-x-2",
              msgPosition ? "right-1" : "-left-1"
            )}
          >
            <p className="text-[10px] sm:text-[11px] text-muted-foreground whitespace-nowrap">
              {formatTimestamp(data.timestemp)}
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
            data={data}
            position={msgPosition}
            user={user}
            fileRef={fileRef}
          />
        </div>
      </div>
    </div>
  );
};
export default Message;

export const FileMessage = ({ data, position, fileRef }: any) => {
  const { userAppearance } = useAppearance();
  const { isDownload, downloadImg } = useDownload();

  return (
    <>
      {data.length == 1 ? (
        <Image
          ref={fileRef}
          src={data[0]}
          alt="image"
          width={300}
          height={250}
          loading="lazy"
          className="w-full sm:w-[300px] rounded-lg"
        />
      ) : (
        <Dialog>
          <DialogTrigger className="relative">
            <Image
              src={data[0]}
              alt="image"
              width={300}
              height={250}
              loading="lazy"
              className="w-full sm:w-[300px] rounded-lg"
            />
            <div className=" text-xs absolute top-2 left-2 py-[3px] px-2 rounded-sm bg-white opacity-70 text-black">
              {data.length}
            </div>
          </DialogTrigger>
          <DialogContent className="w-[95%] md:max-w-[780px]">
            <DialogHeader>
              <DialogTitle>Sended Files</DialogTitle>
            </DialogHeader>
            <section
              ref={fileRef}
              className="flex flex-wrap items-center justify-center border rounded-lg w-full h-auto max-h-[500px] overflow-y-auto relative gap-3 py-4 px-3 mb-7"
            >
              {data.map((item: string, ind: number) => (
                <Image
                  src={item}
                  alt="image"
                  width={300}
                  height={250}
                  loading="lazy"
                  className="w-[46%] sm:w-[48%] rounded-lg"
                  key={ind}
                />
              ))}
            </section>
            <DialogFooter>
              <Button
                className={cn("w-full", position ? "" : userAppearance)}
                onClick={() => downloadImg(fileRef, "multiple")}
                load={isDownload}
              >
                Download All
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export const MessageMenu = ({ data, position, fileRef }: any) => {
  const [isCopied, setIsCopied] = useState(false);
  const { deleteMsg } = useChats();
  const { isDownload, downloadImg, downloadAudio } = useDownload();

  const copyIconCoponent = () => {
    if (isCopied) {
      setTimeout(() => setIsCopied(false), 2000);
      return <CheckIcon className="w-3 md:w-4 h-3 md:h-4 text-green-500" />;
    } else {
      return <CopyIcon className="w-3 md:w-4 h-3 md:h-4" />;
    }
  };
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "absolute top-[50%] transform translate-y-[-50%]",
          position ? "-left-6" : "-right-6"
        )}
      >
        <Button variant="ghost" className="py-0 px-1 hover:bg-transparent">
          <DotsVerticalIcon className="w-4 h-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-full p-0 -mt-0 flex items-center space-x-1",
          position ? "-translate-y-3" : "-translate-y-3"
        )}
        align={position ? "start" : "end"}
      >
        {data?.send?.msg && (
          <Button
            variant="ghost"
            className="!py-0 px-2"
            onClick={() => {
              navigator.clipboard.writeText(data?.send?.msg);
              setIsCopied(true);
            }}
          >
            {copyIconCoponent()}
          </Button>
        )}

        {data?.send?.files?.length == 1 || data?.send?.audio ? (
          <Button
            variant="ghost"
            className="!py-0 px-2"
            onClick={() =>
              data?.send?.files
                ? downloadImg(fileRef, "single")
                : downloadAudio(fileRef)
            }
            load={isDownload}
          >
            <DownloadIcon className="w-3 md:w-4 h-3 md:h-4" />
          </Button>
        ) : null}

        <Button variant="ghost" className="py-0 px-2">
          <LoopIcon className="w-[14px] md:w-[18px] h-[14px] md:h-[18px]" />
        </Button>
        <Button
          variant="ghost"
          className={cn("py-0 px-2", !position && "hidden")}
          onClick={() => deleteMsg(data.id)}
        >
          <TrashIcon className="w-[14px] md:w-[18px] h-[14px] md:h-[18px]" />
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export const MessageSkeleton = () => {
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      <section className="w-full mt-6">
        {skeleton.map((item, index) => (
          <Skeleton
            className={cn(
              "my-[6px]",
              index % 2 !== 0
                ? " float-right clear-both w-48"
                : " float-left clear-both w-60"
            )}
            key={item}
          >
            <Skeleton className="h-10 w-full rounded-md" />
          </Skeleton>
        ))}
      </section>
    </>
  );
};

{
  /* <div
        className="h-[34px] md:h-10 w-16 rounded-lg bg-black text-white my-2 md:my-3 flex items-center justify-center"
        style={{ backgroundColor: userAppearance }}
      >
        <Loader variant="white" />
      </div> */
}
