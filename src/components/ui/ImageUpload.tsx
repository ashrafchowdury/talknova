"use client";
import { useState } from "react";
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
  useToast,
  Input,
} from "@/packages/ui";
import { ImageIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useUsers } from "@/packages/server";
import { cn } from "@/lib/functions";

type ImageComponentType = {
  type: "message" | "profile";
  children: React.ReactNode;
};

const ImageUpload = ({ children, type }: ImageComponentType) => {
  const [imagePreview, setImagePreview] = useState<any>([]);
  const { selectFiles, setSelectFiles, uploadFile } = useUsers();

  const handleImagePreviews = (e: any) => {
    const selectedFiles = e.target.files;
    const MAX_PREVIEW_COUNT = 4;

    if (selectedFiles.length > 0 && selectedFiles.length <= MAX_PREVIEW_COUNT) {
      const imagePreviews: any = [];
      const selectedFilesArray = Array.from(selectedFiles);
      const processFile = (file: any) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          imagePreviews.push({
            name: file.name,
            data: event.target.result,
          });
          if (imagePreviews.length === selectedFilesArray.length) {
            setImagePreview(imagePreviews);
            setSelectFiles([...selectedFiles]);
          }
        };
        reader.readAsDataURL(file);
      };
      selectedFilesArray.forEach((file) => processFile(file));
    } else {
      setImagePreview([]);
      setSelectFiles([]);
    }
  };

  const handleRemoveImage = (data: string) => {
    const preview = imagePreview.filter((item: any) => data !== item.name);
    const file = selectFiles.filter((item: any) => data !== item.name);

    setImagePreview(preview);
    setSelectFiles(file);
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
            imagePreview.length == 4 && "flex-wrap"
          )}
        >
          {imagePreview.length > 0 ? (
            <>
              {imagePreview.map((data: any) => (
                <div
                  className={cn(
                    "relative w-full h-[300px]",
                    imagePreview.length == 4 && "w-[250px] h-[135px]"
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
                    src={data.data}
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
                <ImageIcon className="w-3 md:w-10 h-3 md:h-10 cursor-pointer opacity-70 text-muted-foreground" />
                <p className="text-xl font-semibold mt-2 opacity-70 text-muted-foreground whitespace-nowrap">
                  Select Image
                </p>
              </div>
              <Input
                type="file"
                accept=".png, .jpg, .jpeg"
                className="opacity-0 border w-full h-[300px] cursor-pointer"
                onChange={handleImagePreviews}
                multiple={type == "message" ? true : false}
              />
            </>
          )}
        </section>
        <DialogFooter>
          <DialogClose>
            {imagePreview ? (
              <Button className="w-full" onClick={() => uploadFile(type)}>
                Send
              </Button>
            ) : (
              <Button className="w-full">Close</Button>
            )}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUpload;
