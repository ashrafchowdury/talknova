"use client";

import { Fragment, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { GearIcon, PaperPlaneIcon, ImageIcon } from "@radix-ui/react-icons";
import { Button, Input, Progress } from "@/packages/ui";
import { cn, formatTimeByLastMsg } from "@/lib/functions";
import {
  Message,
  BackSpace,
  Loader,
  Emojies,
  Avatar,
  ImageUpload,
  RecordAudio,
  UnlockChatUI,
} from "@/components";
import { useUsers } from "@/packages/server/context/UserContext";
import { useChats } from "@/packages/server/context/ChatContext";
import { useTheme } from "next-themes";
import { useEncrypt } from "@/packages/encryption";
import { MessageTyping } from "@/components/messages";
import { useChatManager } from "@/lib/hooks";

// JSX
const Chats = () => {
  const router = useRouter();
  const {
    chats,
    autoScroll,
    setAutoScroll,
    handleAutoScroll,
    typingEffect,
    selectedUser,
  } = useChatManager();
  const { theme } = useTheme();
  const { myself } = useUsers();
  const { sendMessage, message, setMessage, fileUploadProgress, isRecording } =
    useChats();
  const { isAutoLock } = useEncrypt();
  const isTyping = selectedUser?.typing?.istyping;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
    if (
      (event.target.value == "" || event.target.value.length < 4) &&
      isTyping
    ) {
      typingEffect(false);
    } else if (event.target.value.length > 4 && !isTyping) {
      typingEffect(true);
    }
  };

  return (
    <main className="md:border-x relative h-screen overflow-hidden flex flex-col justify-start">
      {selectedUser?.key && isAutoLock ? (
        <UnlockChatUI user={selectedUser} />
      ) : null}
      <nav className="h-[57px] md:h-[62px] w-[98%] md:w-[97%] md:px-2 mx-auto border-b flex items-center justify-between bg-background">
        <BackSpace href="/users" />
        <div className="flex items-center">
          <Avatar
            img={selectedUser?.image}
            fallback={selectedUser?.name}
            className="w-9 md:w-10 h-9 md:h-10"
          />
          <div className="ml-2 flex flex-col items-start justify-center">
            <p className="text-[16px] md:text-lg font-bold capitalize">
              {selectedUser?.name}
            </p>
            {isTyping && myself.uid !== selectedUser?.typing?.user ? (
              <div className="flex items-end md:-mt-1">
                <p className="text-xs md:text-sm opacity-60">Typing</p>
                <Loader
                  variant={theme?.includes("light") ? "black" : "white"}
                  className="opacity-50 ml-[2px]"
                />
              </div>
            ) : (
              <p className="text-xs md:text-sm opacity-60 md:-mt-1">
                {selectedUser?.active
                  ? `Active Now ...`
                  : `Last Message ${formatTimeByLastMsg(
                      selectedUser?.lastMsgTime
                    )}`}
              </p>
            )}
          </div>
        </div>

        <div>
          <Button
            variant="ghost"
            title="Settings"
            className="py-[2px] px-2 mx-1 hover:bg-border duration-300"
            onClick={() =>
              router.push(`/users/settings?id=${selectedUser?.uid}`)
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
        onScroll={handleAutoScroll}
        className="chatInterface scroll-smooth w-full h-[80%] sm:h-full px-2 sm:px-6 md:px-8 break-all pt-14 pb-16 sm:pb-24 overflow-y-auto overscroll-contain"
      >
        {chats.length == 0 && (
          <div className="w-full mt-20">
            <p className="text-xl md:text-3xl text-center font-bold text-muted-foreground opacity-80">
              Welcome to {selectedUser?.name} Chat 🎉
            </p>
          </div>
        )}

        {chats.map((data) => (
          <Fragment key={data.id}>
            <Message
              data={data}
              position={data.uid == selectedUser?.uid ? "right" : "left"}
              user={selectedUser}
            />
          </Fragment>
        ))}
        <MessageTyping user={selectedUser} />
      </article>

      <section className="w-[93%] sm:w-[490px] md:w-[690px] lg:w-[650px] xl:w-[750px] bg-background fixed bottom-0 left-1/2 transform -translate-x-[50%]">
        <div className="relative mb-3">
          {!isRecording && (
            <Input
              placeholder="Type a Message..."
              className=" !py-6 text-sm md:text-[16px] pr-36"
              onChange={handleInputChange}
              onBlur={() => isTyping && typingEffect(false)}
              value={message}
              disabled={fileUploadProgress !== 0}
            />
          )}

          <div
            className={cn(
              "flex items-center space-x-1 md:space-x-3 absolute top-[7px] right-2",
              isRecording &&
                "w-full md:w-[96%] -top-12 md:-top-14 right-[50%] transform translate-x-[50%]"
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

export default Chats;
