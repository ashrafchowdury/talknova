import Loader from "./Loader";

import { useState } from "react";
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
import { useUsers } from "@/packages/server";
import {
  TrashIcon,
  DotsVerticalIcon,
  CopyIcon,
  LoopIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import { Avatar, AudioMessage, LinkPreview } from ".";
import { useAppearance } from "@/lib/hooks";

type MessageType = {
  data?: any;
  position: "left" | "right";
};

const Message = ({ data, position }: MessageType) => {
  const { userAppearance } = useAppearance();
  const { selectedUser, myself } = useUsers();
  const msgPosition = position == "left";
  const urlRegex = /(https?:\/\/[^\s]+)/g;

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
        "w-full my-4",
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
          img={msgPosition ? myself.image : selectedUser.image}
          fallback={msgPosition ? myself.name : selectedUser.name}
          className="w-4 md:w-6 h-4 md:h-6 text-[7px] md:text-[9px]"
        />

        <div
          className={cn(
            "py-2 md:py-3 px-4 md:px-5 text-xs sm:text-sm md:text-[16px] rounded-lg relative flex items-center justify-center",
            msgPosition
              ? "!ml-4 !mr-2 bg-border"
              : "!mr-4 bg-primary text-white dark:primary",
            data?.send?.files && "py-0 md:py-0 px-0 md:px-0 bg-transparent",
            data?.send?.audio && "py-0 md:py-0 px-0 md:px-0 bg-transparent",
            msgPosition ? "" : userAppearance
          )}
        >
          {data?.send?.audio && (
            <AudioMessage data={data?.send?.audio} position={msgPosition} />
          )}
          {data?.send?.files && (
            <FileMessage data={data?.send?.files} position={msgPosition} />
          )}

          {data?.send?.msg && data?.send?.msg?.match(urlRegex) ? (
            <LinkPreview message={data?.send?.msg} />
          ) : (
            <span>{data?.send?.msg}</span>
          )}
          <div
            className={cn(
              "absolute -bottom-[18px] flex items-center space-x-2",
              msgPosition ? "right-1" : "-left-1"
            )}
          >
            <div
              className={cn("relative", msgPosition ? "right-1" : " hidden")}
            >
              <CheckIcon className="w-2 sm:w-3 h-2 sm:h-3" />
              <CheckIcon className="w-2 sm:w-3 h-2 sm:h-3 absolute top-0 left-[4px]" />
            </div>
            <p className="text-[9px] sm:text-[10px] text-muted-foreground whitespace-nowrap">
              {formatTimestamp(data.timestemp)}
            </p>
          </div>
          <MessageMenu data={data} position={msgPosition} />
        </div>
      </div>
    </div>
  );
};
export default Message;

export const FileMessage = ({ data, position }: any) => {
  const { userAppearance } = useAppearance();
  return (
    <>
      {data.length == 1 ? (
        <Image
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
            <section className="flex flex-wrap items-center justify-center border rounded-lg w-full h-auto max-h-[500px] overflow-y-auto relative gap-3 py-4 px-3 mb-7">
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
              <DialogClose>
                <Button
                  className={cn("w-full", position ? "" : userAppearance)}
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export const MessageMenu = ({ data, position }: any) => {
  const [isCopied, setIsCopied] = useState(false);
  const { deleteMsg } = useUsers();

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
          position ? "-left-6" : "-right-6 hidden"
        )}
      >
        <Button variant="ghost" className="py-0 px-1 hover:bg-transparent">
          <DotsVerticalIcon className="w-4 h-4" />
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
