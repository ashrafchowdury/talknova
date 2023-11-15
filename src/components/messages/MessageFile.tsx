import { MutableRefObject } from "react";
import Image from "next/image";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/packages/ui";
import { cn } from "@/lib/functions";
import { useAppearance, useDownload } from "@/lib/hooks";

type FileMessageType<T> = {
  data: T;
  position: boolean;
  fileRef: MutableRefObject<HTMLImageElement | HTMLAudioElement>;
};

const MessageFile = ({
  data,
  position,
  fileRef,
}: FileMessageType<string[]>) => {
  const { userAppearance } = useAppearance();
  const { isDownload, downloadImg } = useDownload();

  return (
    <>
      {data.length == 1 ? (
        <Image
          ref={fileRef as MutableRefObject<HTMLImageElement>}
          src={data[0]}
          alt="image"
          width={300}
          height={250}
          loading="lazy"
          className="w-full sm:w-[300px] min-h-[100px] max-h-auto rounded-lg"
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
              className="w-full sm:w-[300px] min-h-[100px] max-h-auto rounded-lg"
            />
            <div className=" text-xs absolute top-2 left-2 py-[3px] px-2 rounded-sm bg-white opacity-70 text-black">
              {data.length}
            </div>
          </DialogTrigger>
          <DialogContent className="w-[95%] md:max-w-[780px] rounded-lg">
            <DialogHeader>
              <DialogTitle>Sended Files</DialogTitle>
            </DialogHeader>
            <section
              ref={fileRef}
              className="flex flex-wrap items-center justify-center rounded-lg w-full h-auto max-h-[500px] overflow-y-auto relative gap-3 py-4 px-3 mb-7"
            >
              {data.map((item: string, ind: number) => (
                <Image
                  src={item}
                  alt="image"
                  width={300}
                  height={250}
                  loading="lazy"
                  className="w-[46%] sm:w-[48%] min-h-[100px] max-h-auto rounded-lg"
                  key={ind}
                />
              ))}
            </section>
            <DialogFooter>
              <Button
                className={cn("w-full", position ? "" : userAppearance)}
                onClick={() =>
                  downloadImg(
                    fileRef as MutableRefObject<HTMLImageElement>,
                    "multiple"
                  )
                }
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
export default MessageFile;
