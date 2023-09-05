import Loader from "./Loader";

import Image from "next/image";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@/packages/ui";
import { cn } from "@/lib/functions";
import { useUI, useUsers } from "@/provider";
import {
  TrashIcon,
  DotsVerticalIcon,
  CopyIcon,
  LoopIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import { Avatar } from ".";

type MessageType = {
  data?: any;
  position: "left" | "right";
};

const Message = ({ data, position }: MessageType) => {
  const { userAppearance } = useUI();
  const { selectedUser, myself } = useUsers();
  const msgPosition = position == "left";
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
              ? "!ml-4 !mr-2 bg-slate-300"
              : "!mr-4 bg-black text-white",
            data?.images?.length > 0 && "px-3 md:px-4"
          )}
          // style={{ backgroundColor: userAppearance }}
        >
          {data?.images?.length > 0 && (
            <Image
              src={data?.images[0]}
              alt="image"
              width={300}
              height={250}
              loading="lazy"
              className="w-[300px] rounded-lg"
            />
          )}
          {data.msg.length > 0 && <span>{data.msg}</span>}
          <div
            className={cn(
              "absolute -bottom-[18px] flex items-center space-x-2",
              msgPosition ? "right-1" : "-left-1"
            )}
          >
            <div
              className={cn("relative", msgPosition ? "right-1" : " hidden")}
            >
              <CheckIcon className="w-3 sm:w-4 h-3 sm:h-4" />
              <CheckIcon className="w-3 sm:w-4 h-3 sm:h-4 absolute top-0 left-[4px]" />
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
              11:30PM
            </p>
          </div>
          <MessageMenu data={data} position={msgPosition} />
        </div>
      </div>
    </div>
  );
};

const MessageMenu = ({ data, position }: any) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="ghost"
          className={cn(
            "py-0 px-1 absolute top-[50%] transform translate-y-[-50%] invisible group-hover/item:visible",
            position ? "-left-6" : "-right-6"
          )}
        >
          <DotsVerticalIcon className="w-4 h-4 text-black" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-full p-0 -mt-0 flex items-center space-x-1",
          position ? "" : "-translate-x-1"
        )}
      >
        <Button
          variant="ghost"
          className="!py-0 px-2"
          onClick={() => navigator.clipboard.writeText(data?.msg)}
        >
          <CopyIcon className="w-3 md:w-4 h-3 md:h-4" />
        </Button>
        <Button variant="ghost" className="py-0 px-2">
          <LoopIcon className="w-[14px] md:w-[18px] h-[14px] md:h-[18px]" />
        </Button>
        <Button
          variant="ghost"
          className={cn("py-0 px-2", !position && "hidden")}
        >
          <TrashIcon className="w-[14px] md:w-[18px] h-[14px] md:h-[18px]" />
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default Message;
{
  /* <div
        className="h-[34px] md:h-10 w-16 rounded-lg bg-black text-white my-2 md:my-3 flex items-center justify-center"
        style={{ backgroundColor: userAppearance }}
      >
        <Loader variant="white" />
      </div> */
}
