"use client";
import { useState, Fragment } from "react";
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
import { PaperPlaneIcon, ImageIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useUsers } from "@/provider";

const ImageUpload = () => {
  const [imagePreview, setImagePreview] = useState("");
  const { selectedUser, userId, sendMessage, selectFiles, setSelectFiles } =
    useUsers();

  const handleImagePreview = (e: any) => {
    const fileInput = e.target;
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => setImagePreview(e.target.result);
      reader.readAsDataURL(fileInput.files[0]);
    } else {
      setImagePreview(""); // Clear the preview if no file is selected
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          title="Select Media"
          variant="ghost"
          className="py-[2px] px-2 hover:bg-slate-200 duration-300"
        >
          <ImageIcon className="w-3 md:w-4 h-3 md:h-4 cursor-pointer" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95%] sm:max-w-[580px]">
        <DialogHeader>
          <DialogTitle>Send Files</DialogTitle>
          <DialogDescription>
            You can select maximam 4 Images at one's
          </DialogDescription>
        </DialogHeader>
        <section className="flex items-center justify-center border rounded-lg h-[300px] relative">
          {imagePreview ? (
            <div className="relative w-full h-[300px]">
              <Button
                variant="outline"
                size="icon"
                className="w-6 md:w-7 h-6 md:h-7 absolute z-50 top-2 right-2 bg-white opacity-60 hover:opacity-80"
                onClick={() => setImagePreview("")}
              >
                <Cross2Icon className="w-3 md:w-4 h-3 md:h-4" />
              </Button>
              <Image
                src={imagePreview}
                fill={true}
                alt="Preview"
                className="rounded-lg object-cover"
              />
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
                <ImageIcon className="w-3 md:w-10 h-3 md:h-10 cursor-pointer opacity-70 text-muted-foreground" />
                <p className="text-xl font-semibold mt-2 opacity-70 text-muted-foreground whitespace-nowrap">
                  Upload Image
                </p>
              </div>
              <Input
                type="file"
                accept=".png, .jpg, .jpeg"
                className="opacity-0 border w-full h-[300px] cursor-pointer"
                onChange={handleImagePreview}
                multiple
              />
            </>
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

export default ImageUpload;
