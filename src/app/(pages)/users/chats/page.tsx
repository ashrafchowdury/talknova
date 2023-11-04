"use client";

import { Fragment, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { GearIcon, PaperPlaneIcon, ImageIcon } from "@radix-ui/react-icons";
import { Button, Input, Progress } from "@/packages/ui";
import { cn } from "@/lib/functions";
import {
  Message,
  BackSpace,
  Loader,
  Emojies,
  Avatar,
  ImageUpload,
  RecordAudio,
  AddSecretKey,
} from "@/components/interfaces";
import { useUsers } from "@/packages/server/context/UserContext";
import { useChats } from "@/packages/server/context/ChatContext";
import { useTheme } from "next-themes";
import { useEncrypt } from "@/packages/encryption";
import { UserType } from "@/packages/server/types";
import {
  doc,
  onSnapshot,
  collection,
  query,
  orderBy,
  limit,
  getDoc,
  getDocs,
  startAfter,
} from "firebase/firestore";
import { database } from "@/packages/server/config";

const Chats = () => {
  const [chats, setChats] = useState<any>([]);
  const [chatId, setChatId] = useState<any>({ id: "", load: true });
  const [autoScroll, setAutoScroll] = useState(true);
  const id: any = useSearchParams().get("id");
  const router = useRouter();
  const { theme } = useTheme();
  const { friends, myself, isLoading } = useUsers();
  const {
    sendMessage,
    message,
    setMessage,
    fileUploadProgress,
    isRecording,
    createChatId,
  } = useChats();
  const { isAutoLock } = useEncrypt();
  const user: UserType = friends.filter((item) => item.uid == id)[0];

  useEffect(() => {
    setChats([]);
    setAutoScroll(true);
    setChatId({ id: "", load: true });
    getChats();
  }, [user?.uid]);

  const handleLoad = () => {
    const doc: any = document.querySelector(".chatInterface");
    doc.scrollTop = doc?.scrollHeight;
  };

  const getChats = () => {
    try {
      const q = query(
        collection(database, "chats", `${createChatId()}`, `messagas`),
        orderBy("timestemp", "desc"),
        limit(10)
      );
      onSnapshot(q, (snapshot) => {
        setChats(
          snapshot.docs
            .map((doc: any) => ({
              ...doc.data(),
              id: doc.id,
            }))
            .reverse()
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getFirstChat = async () => {
    try {
      const q = query(
        collection(database, "chats", `${createChatId()}`, "messagas"),
        orderBy("timestemp", "asc"),
        limit(1)
      );
      const firstChat = await getDocs(q);
      setChatId({ id: firstChat.docs[0].id, load: true });
    } catch (error) {
      console.log(error);
    }
  };
  const getOldChats = async () => {
    try {
      !chatId.id && getFirstChat();
      const firstMeg = await getDoc(
        doc(database, "chats", `${createChatId()}`, "messagas", chats.at(0).id)
      );
      firstMeg.id == chatId.id && setChatId({ ...chatId, load: false });
      const q = query(
        collection(database, "chats", `${createChatId()}`, "messagas"),
        orderBy("timestemp", "desc"),
        startAfter(firstMeg),
        limit(15)
      );
      onSnapshot(q, (snapshot) => {
        const oldChats = snapshot.docs
          .map((doc: any) => ({ ...doc.data(), id: doc.id }))
          .reverse();
        setChats([...oldChats, ...chats]);
      });
    } catch (error) {
      console.log(error);
    }
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
    <main className="border-x md:mt-2 relative w-[95%] sm:w-[520px] md:w-[720px] lg:w-[680px] xl:w-[780px] mx-auto">
      {user?.key && isAutoLock ? <AddSecretKey user={user} /> : null}
      <nav className="h-[60px] px-2 sm:px-6 md:px-8 border-b flex items-center justify-between sticky z-20 top-0 bg-background">
        <BackSpace href="/users" />
        <div className="flex items-center">
          <Avatar
            img={user?.image}
            fallback={user?.name}
            className=" w-10 h-10"
          />
          <div className="ml-2">
            <p className="text-[16px] md:text-lg font-bold capitalize">
              {user?.name}
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
            className="py-[2px] px-2 mx-1 hover:bg-border duration-300"
            onClick={() => router.push(`/users/settings?id=${user?.uid}`)}
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
        onScroll={handleScroll}
        className="chatInterface scroll-smooth w-full h-[86.5vh] px-2 sm:px-6 md:px-8 break-all pt-16 pb-10 overflow-y-auto"
      >
        {chats.length == 0 && (
          <div className="w-full mt-20">
            <p className="text-xl md:text-3xl text-center font-bold text-muted-foreground opacity-80">
              Welcome to {user?.name} Chat 🎉
            </p>
          </div>
        )}

        {chats.map((data: any) => (
          <Fragment key={data.id}>
            <Message
              data={data}
              position={data.uid == user?.uid ? "right" : "left"}
              user={user}
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
              value={message}
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

export default Chats;
