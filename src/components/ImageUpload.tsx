"use client";

import Image from "next/image";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  Input,
} from "@/packages/ui";
import { ImageIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useChats } from "@/packages/server/context/ChatContext";
import { cn } from "@/lib/functions";
import { useImgCompress } from "@/packages/compressor";

type ImageComponentType = {
  type: "message" | "profile";
  children: React.ReactNode;
};

const ImageUpload = ({ children, type }: ImageComponentType) => {
  const { uploadFile } = useChats();
  const { compressImg, preview, production, setPreview, setProduction } =
    useImgCompress();

  const handleRemoveImage = (name: string) => {
    const removePrev = preview.filter((item) => name !== item.name);
    const file = production.filter((item) => name !== item.name);
    setPreview(removePrev);
    setProduction(file);
  };

  const clearImgStates = () => {
    setPreview([]);
    setProduction([]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[95%] sm:max-w-[580px]">
        <DialogHeader>
          <DialogTitle>
            {type == "message" ? "Send Files" : "Update Picture"}
          </DialogTitle>
          {type == "message" && (
            <DialogDescription>
              You can select maximam 4 Images at ones
            </DialogDescription>
          )}
        </DialogHeader>
        <section
          className={cn(
            "flex items-center justify-center border rounded-lg h-[300px] relative gap-2",
            preview.length == 4 && "flex-wrap"
          )}
        >
          {preview.length > 0 ? (
            <>
              {preview.map((data) => (
                <div
                  className={cn(
                    "relative w-full h-[300px]",
                    preview.length == 4 && "w-[250px] h-[135px]"
                  )}
                  key={data.name}
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-6 md:w-7 h-6 md:h-7 absolute z-50 top-2 right-2 bg-white opacity-60 hover:opacity-80"
                    onClick={() => handleRemoveImage(data.name)}
                  >
                    <Cross2Icon className="w-3 md:w-4 h-3 md:h-4" />
                  </Button>
                  <Image
                    src={data.data as string}
                    fill={true}
                    alt="Preview"
                    className="rounded-lg object-cover"
                  />
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
                <ImageIcon className="w-7 md:w-10 h-7 md:h-10 cursor-pointer opacity-70 text-muted-foreground" />
                <p className="text-xl font-semibold mt-2 opacity-70 text-muted-foreground whitespace-nowrap">
                  Select Image
                </p>
              </div>
              <Input
                type="file"
                accept=".png, .jpg, .jpeg"
                className="opacity-0 border w-full h-[300px] cursor-pointer"
                onChange={(e) => compressImg(e.target.files as FileList)}
                multiple={type == "message" ? true : false}
              />
            </>
          )}
        </section>
        <DialogFooter>
          <DialogClose>
            {preview.length > 0 ? (
              <Button
                className="w-full"
                onClick={() => {
                  uploadFile(type, production);
                  clearImgStates();
                }}
              >
                Send
              </Button>
            ) : (
              <Button className="w-full" onClick={clearImgStates}>
                Close
              </Button>
            )}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUpload;
