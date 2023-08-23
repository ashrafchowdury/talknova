"use client";

import {
  GearIcon,
  PaperPlaneIcon,
  ImageIcon,
  MixerVerticalIcon,
} from "@radix-ui/react-icons";
import {
  Button,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Input,
} from "@/packages/ui";
import { useUI } from "@/provider";
import { cn } from "@/lib/functions";
import { ClassType } from "@/types";
import { Message, BackSpace, Loader, Emojies } from "./ui";
import { useRouter } from "next/navigation";
import { useUsers } from "@/provider";

const Chat = ({ className }: ClassType) => {
  const { windowSize, userAppearance } = useUI();
  const router = useRouter();
  const { selectedUser, userId } = useUsers();

  return (
    <main className={cn("h-[98vh] border-x md:mt-2 relative", className)}>
      <nav className="h-[60px] px-2 sm:px-6 md:px-8 border-b flex items-center justify-between sticky top-0">
        <BackSpace />
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={selectedUser?.image} alt={selectedUser?.name} />
          </Avatar>
          <div className="ml-2">
            <p className="text-lg font-bold ">{selectedUser?.name}</p>
            <p className="text-sm opacity-60 -mt-1 flex items-end ">
              Typing <Loader variant="black" className="opacity-50 ml-[2px]" />
            </p>
          </div>
        </div>

        <div>
          <Button
            variant="ghost"
            title="Settings"
            className="py-[2px] px-2 mx-1 hover:bg-slate-200 duration-300"
            onClick={() =>
              windowSize < 1350
                ? router.push(`/user-settings#${selectedUser?.id}`)
                : null
            }
          >
            <GearIcon className="w-5 h-5" />
          </Button>
        </div>
      </nav>

      <article className=" w-full h-[86.5vh] px-2 sm:px-6 md:px-8 flex flex-col items-start pt-16 md:overflow-y-auto">
        <Message />
      </article>
      <section className=" sticky bottom-3">
        <div className="mx-3 md:mx-8 relative">
          <Input
            placeholder="Type a Message..."
            className=" !py-6 text-[16px] border border-black pr-16"
          />
          <div className=" flex items-center space-x-3 absolute top-[7px] right-2">
            <Emojies />
            <Button
              title="Select Media"
              variant="ghost"
              className="py-[2px] px-2 hover:bg-slate-200 duration-300 relative overflow-hidden "
            >
              <ImageIcon className="w-4 h-4 cursor-pointer" />
              <Input
                type="file"
                accept=".png, .jpg, .jpeg"
                className=" opacity-0 absolute top-0 left-0 right-0 bottom-0 cursor-pointer"
              />
            </Button>
            {/* <Button title="Record Voice" className="py-0 px-3">
              <MixerVerticalIcon className="w-4 h-4" />
            </Button> */}
            <Button
              title="Send Message"
              className="py-0 px-3"
              style={{ backgroundColor: userAppearance }}
            >
              <PaperPlaneIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Chat;
