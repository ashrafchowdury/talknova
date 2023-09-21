import { useState, useRef, Fragment } from "react";
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
import { useUI, useUsers } from "@/provider";
import { ImageIcon, CopyIcon } from "@radix-ui/react-icons";

const AllImages = () => {
  const { chats } = useUsers();
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button
          variant="outline"
          title="All Shared Imgaes"
          className="h-14 w-full hover:bg-border duration-300"
        >
          <ImageIcon className="w-7 h-7" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95%] md:max-w-[780px] lg:max-w-[1025px]">
        <DialogHeader>
          <DialogTitle>Sended Files</DialogTitle>
        </DialogHeader>
        <section className="flex flex-wrap items-center justify-center border rounded-lg w-full h-auto max-h-[70vh] md:max-h-[65vh] lg:max-h-[700px] overflow-y-auto relative gap-3 py-4 px-3 mb-7">
          {chats?.map((data: any) => (
            <Fragment key={data.timestamp}>
              {data?.send?.files?.map((item: any, ind: number) => (
                <div className="relative w-full md:w-[48%]" key={ind}>
                  <Image
                    src={item}
                    alt="image"
                    width={300}
                    height={250}
                    loading="lazy"
                    className={`w-full rounded-lg`}
                  />
                </div>
              ))}
            </Fragment>
          ))}
          {chats?.map((data: any) => data?.send?.files?.length == 0) && (
            <p className="font-semibold text-muted-foreground my-20">Empty</p>
          )}
        </section>
        <DialogFooter>
          <DialogClose>
            <Button className="w-full">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AllImages;
