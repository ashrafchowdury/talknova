"use client";

import { useEffect, useState } from "react";
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
  Timestamp,
} from "firebase/firestore";
import { database } from "@/packages/server";
import { useUsers } from "@/packages/server/context/UserContext";
import { useChats } from "@/packages/server/context/ChatContext";
import { UserType } from "@/packages/server";
import { useSearchParams } from "next/navigation";

// Types
type ChatType = {
  id: string;
  send: { audio?: string; msg?: string; files?: string[] };
  uid: string;
  timestemp: Timestamp;
  seen: boolean;
};
type ChatId = {
  id: string;
  load: boolean;
};

const useChatManager = () => {
  const [chats, setChats] = useState<ChatType[]>([]);
  const [chatId, setChatId] = useState<ChatId>({ id: "", load: true });
  const [autoScroll, setAutoScroll] = useState(true);

  // hooks
  const { friends, myself, isLoading } = useUsers();
  const { createChatId } = useChats();
  const id = useSearchParams().get("id");
  const selectedUser: UserType = friends.filter((item) => item.uid == id)[0];

  // effects
  useEffect(() => {
    setChats([]);
    setAutoScroll(true);
    setChatId({ id: "", load: true });
    getChats();
  }, [selectedUser?.uid]);

  useEffect(() => {
    if (autoScroll) {
      const doc: Element | null = document.querySelector(".chatInterface");
      doc ? (doc.scrollTop = doc?.scrollHeight) : null;
    }
    seenMsg();
  }, [chats, selectedUser?.typing]);

  // functions
  const getChats = () => {
    try {
      const q = query(
        collection(database, "chats", `${createChatId()}`, `messagas`),
        orderBy("timestemp", "desc"),
        limit(10)
      );
      onSnapshot(q, (snapshot) => {
        const data = snapshot.docs
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          .reverse() as ChatType[];
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
        doc(
          database,
          "chats",
          `${createChatId()}`,
          "messagas",
          (chats.at(0) as ChatType).id
        )
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
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .reverse() as ChatType[];
        setChats([...oldChats, ...chats]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAutoScroll = () => {
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
      const unseenChats = chats.filter((data) => {
        return data.uid === myself.uid ? null : data.seen == false;
      });
      if (unseenChats.length > 0) {
        unseenChats.forEach(async (data) => {
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

  const typingEffect = async (typing: boolean) => {
    await updateDoc(doc(database, "chats", `${createChatId()}`), {
      typing: {
        user: myself.uid,
        istyping: typing,
      },
    });
  };

  return {
    chats,
    setChats,
    chatId,
    setChatId,
    autoScroll,
    setAutoScroll,
    selectedUser,
    // functions
    handleAutoScroll,
    typingEffect,
  };
};

export default useChatManager;
