import { useState, MutableRefObject } from "react";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@/packages/ui";
import {
  TrashIcon,
  DotsVerticalIcon,
  CopyIcon,
  LoopIcon,
  CheckIcon,
  DownloadIcon,
} from "@radix-ui/react-icons";
import { useDownload } from "@/lib/hooks";
import { cn } from "@/lib/functions";
import { useChats } from "@/packages/server/context/ChatContext";
import { MsgType } from "@/packages/server";

type FileMessageType<T> = {
  data: T;
  position: boolean;
  fileRef: MutableRefObject<HTMLImageElement | HTMLAudioElement>;
};

const MessageMenu = ({ data, position, fileRef }: FileMessageType<MsgType>) => {
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
              navigator.clipboard.writeText(data?.send.msg as string);
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
              data?.send.files
                ? downloadImg(
                    fileRef as MutableRefObject<HTMLImageElement>,
                    "single"
                  )
                : downloadAudio(fileRef as MutableRefObject<HTMLAudioElement>)
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
          onClick={() => deleteMsg(data.id as string)}
        >
          <TrashIcon className="w-[14px] md:w-[18px] h-[14px] md:h-[18px]" />
        </Button>
      </PopoverContent>
    </Popover>
  );
};
export default MessageMenu;
