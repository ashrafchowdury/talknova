"use client";

import { Fragment, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
  updateDoc,
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

  useEffect(() => {
    if (autoScroll) {
      const doc: any = document.querySelector(".chatInterface");
      doc.scrollTop = doc?.scrollHeight;
    }
    seenMsg();
  }, [chats]);

  const getChats = () => {
    try {
      const q = query(
        collection(database, "chats", `${createChatId()}`, `messagas`),
        orderBy("timestemp", "desc"),
        limit(10)
      );
      onSnapshot(q, (snapshot) => {
        const data = snapshot.docs
          .map((doc: any) => ({
            ...doc.data(),
            id: doc.id,
          }))
          .reverse();
        setChats(data);
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

  const seenMsg = () => {
    try {
      const unseenChats = chats.filter((data: any) => {
        return data.uid === myself.uid ? null : data.seen == false;
      });
      if (unseenChats.length > 0) {
        unseenChats.forEach(async (data: any) => {
          await updateDoc(
            doc(database, "chats", `${createChatId()}`, "messagas", data.id),
            {
              seen: true,
            }
          );
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="md:border-x relative h-screen overflow-hidden flex flex-col justify-start">
      {user?.key && isAutoLock ? <AddSecretKey user={user} /> : null}
      <nav className="h-[55px] md:h-[60px] w-[98%] md:w-[97%] md:px-2 mx-auto border-b flex items-center justify-between bg-background">
        <BackSpace href="/users" />
        <div className="flex items-center">
          <Avatar
            img={user?.image}
            fallback={user?.name}
            className="w-9 md:w-10 h-9 md:h-10"
          />
          <div className="ml-2 flex flex-col items-start justify-center">
            <p className="text-[16px] md:text-lg font-bold capitalize">
              {user?.name}
            </p>

            <p className="text-xs md:text-sm opacity-60 md:-mt-1">
              {user?.active
                ? `Active Now ...`
                : `Last Message ${formatTimeByLastMsg(user?.lastMsgTime)}`}
            </p>
            {/* <p>Typing</p>
              <Loader
                variant={theme?.includes("light") ? "black" : "white"}
                className="opacity-50 ml-[2px]"
              /> */}
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
        onScroll={handleScroll}
        className="chatInterface scroll-smooth w-full h-[80%] sm:h-full px-2 sm:px-6 md:px-8 break-all pt-14 pb-16 sm:pb-24 overflow-y-auto overscroll-contain"
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

      <section className="w-[93%] sm:w-[490px] md:w-[690px] lg:w-[650px] xl:w-[750px] bg-background fixed bottom-0 left-1/2 transform -translate-x-[50%]">
        <div className="relative mb-3">
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
