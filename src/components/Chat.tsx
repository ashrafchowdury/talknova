"use client";

import { Fragment } from "react";
import { GearIcon, PaperPlaneIcon, ImageIcon } from "@radix-ui/react-icons";
import { Button, Input, Progress } from "@/packages/ui";
import { useWindowResize } from "@/lib/hooks";
import { cn } from "@/lib/functions";
import { ClassType } from "@/types";
import {
  Message,
  BackSpace,
  Loader,
  Emojies,
  Avatar,
  ImageUpload,
  RecordAudio,
  AddSecretKey,
} from "./ui";
import { useRouter } from "next/navigation";
import { useUsers } from "@/packages/server";
import { useTheme } from "next-themes";
import { useEncrypt } from "@/packages/encryption";

const Chat = ({ className }: ClassType) => {
  const { windowSize } = useWindowResize();
  const router = useRouter();
  const { theme } = useTheme();
  const {
    selectedUser,
    userId,
    chats,
    sendMessage,
    message,
    setMessage,
    fileUploadProgress,
    isRecording,
    getOldChats,
    chatId,
    autoScroll,
    setAutoScroll,
  } = useUsers();
  const { isAutoLock, toggleLockUi } = useEncrypt();

  const handleLoad = () => {
    const doc: any = document.querySelector(".chatInterface");
    doc.scrollTop = doc?.scrollHeight;
  };

  const handleScroll = () => {
    const clientHeight = document.querySelector(
      ".chatInterface"
    ) as HTMLElement;
    if (clientHeight.scrollTop == 0 && chatId.load && chats.length > 6) {
      autoScroll && setAutoScroll(false);
      clientHeight.scrollTop = 5;
      getOldChats();
    }
  };

  return (
    <main className={cn(" border-x md:mt-2 relative", className)}>
      {selectedUser.key && isAutoLock ? <AddSecretKey /> : null}
      <nav className="h-[60px] px-2 sm:px-6 md:px-8 border-b flex items-center justify-between sticky z-20 top-0 bg-background">
        <BackSpace href="/users" />
        <div className="flex items-center">
          <Avatar
            img={selectedUser?.image}
            fallback={selectedUser?.name}
            className=" w-10 h-10"
          />
          <div className="ml-2">
            <p className="text-[16px] md:text-lg font-bold">
              {selectedUser?.name}
            </p>
            <div className="text-xs md:text-sm opacity-60 -mt-1 flex items-end ">
              <p>Typing</p>
              <Loader
                variant={theme?.includes("light") ? "black" : "white"}
                className="opacity-50 ml-[2px]"
              />
            </div>
          </div>
        </div>

        <div>
          <Button
            variant="ghost"
            title="Settings"
            className="py-[2px] px-2 mx-1 hover:bg-slate-200 dark:hover:bg-slate-800 duration-300"
            onClick={() =>
              windowSize < 1350 &&
              router.push(`/user-settings#${selectedUser?.id}`)
            }
          >
            <GearIcon className="w-5 h-5" />
          </Button>
        </div>
      </nav>
      {fileUploadProgress !== 0 && (
        <Progress value={fileUploadProgress} className="w-full" />
      )}
      <article
        onLoad={() => (autoScroll ? handleLoad() : null)}
        // onScroll={handleScroll}
        className="chatInterface scroll-smooth w-full h-[86.5vh] px-2 sm:px-6 md:px-8 break-all pt-16 pb-10 overflow-y-auto"
      >
        {chats.length == 0 && (
          <div className="w-full mt-20">
            <p className="text-xl md:text-3xl text-center font-bold text-muted-foreground opacity-80">
              Welcome to {selectedUser.name} Chat 🎉
            </p>
          </div>
        )}

        {chats.map((data: any) => (
          <Fragment key={data.id}>
            <Message
              data={data}
              position={data.uid == selectedUser.uid ? "right" : "left"}
            />
          </Fragment>
        ))}
      </article>

      <section className="w-full sticky z-20 bottom-2 md:bottom-3 bg-background">
        <div className="relative mx-3 md:mx-8">
          {!isRecording && (
            <Input
              placeholder="Type a Message..."
              className=" !py-6 text-sm md:text-[16px] pr-36"
              onChange={(e) => setMessage(e.target.value)}
              value={typeof message === "string" ? message : ""}
              disabled={fileUploadProgress !== 0}
            />
          )}

          <div
            className={cn(
              "flex items-center space-x-1 md:space-x-3 absolute top-[7px] right-2",
              isRecording && "w-full -top-6 md:-top-3 right-0"
            )}
          >
            {!isRecording && (
              <>
                <Emojies />
                <ImageUpload type="message">
                  <Button
                    title="Select Media"
                    variant="ghost"
                    className="py-[2px] px-2 hover:bg-border duration-300 mr-3"
                  >
                    <ImageIcon className="w-[14px] sm:w-4 h-[14px] sm:h-4 cursor-pointer" />
                  </Button>
                </ImageUpload>
              </>
            )}
            {message ? (
              <Button
                title="Send Message"
                size="icon"
                className="w-8 md:w-9 h-8 md:h-9"
                onClick={() => {
                  !autoScroll && setAutoScroll(true);
                  sendMessage();
                }}
              >
                <PaperPlaneIcon className="w-3 md:w-4 h-3 md:h-4" />
              </Button>
            ) : (
              <RecordAudio />
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Chat;
