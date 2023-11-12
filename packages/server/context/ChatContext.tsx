"use client";
import React, { useState, useContext, createContext } from "react";
import {
  doc,
  collection,
  query,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { database } from "../config";
import { useCookies } from "@/lib/hooks";
import { useEncrypt } from "@/packages/encryption";
import { toast } from "@/packages/ui/hooks/use-toast";
import {
  MsgType,
  ChatContextProviderType,
  ChildrenType,
  ChatIdType,
} from "../types";
import { useUsers } from "./UserContext";
import { useSearchParams } from "next/navigation";

export const ChatContext = createContext<ChatContextProviderType | null>(null);
export const useChats = () => useContext(ChatContext)!;

const ChatContextProvider: React.FC<ChildrenType> = ({
  children,
}: ChildrenType) => {
  const [chats, setChats] = useState<MsgType[]>([]);
  const [chatId, setChatId] = useState<ChatIdType>({ id: "", load: true });
  const [message, setMessage] = useState("");
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);

  // custom hooks
  const { updateUserProfile, myself } = useUsers();
  const { uid } = useCookies();
  const { setToggleLockUi, setIsAutoLock, encryptData, key } = useEncrypt();
  const id: any = useSearchParams().get("id");

  const createChatId = () => {
    const combinedUid = [myself.uid, id].sort().join("");
    return combinedUid;
  };

  const toggleChatKey = async (secKey: string) => {
    await updateDoc(doc(database, "chats", `${createChatId()}`), {
      key: secKey,
      lastMsgTime: new Date().toISOString(),
      lastMsg: encryptData(
        secKey ? "Added AutoLock" : "AutoLock Removed",
        createChatId()
      ),
    });
  };

  const sendMessage = async (files?: any) => {
    try {
      const q: any = query(
        collection(database, "chats", `${createChatId()}`, "messagas")
      );
      if (!message && !files) {
        return null;
      } else {
        let msg: any;
        let lastMsg: any;
        if (message.length > 0) {
          msg = { msg: encryptData(message, createChatId()) };
          lastMsg = message;
        } else if (Array.isArray(files)) {
          msg = { files: files };
          lastMsg = "Send Images";
        } else if (typeof files === "string") {
          msg = { audio: `${files}` };
          lastMsg = "Audio message";
        }
        await addDoc(q, {
          send: msg,
          timestemp: serverTimestamp(),
          uid: uid,
          seen: false,
        });
        await updateDoc(doc(database, "chats", `${createChatId()}`), {
          lastMsgTime: new Date().toISOString(),
          lastMsg: `${encryptData(lastMsg, createChatId())}`,
        });
        setMessage("");
      }
    } catch (error) {
      toast({ title: "Something went wrong!", variant: "destructive" });
    }
  };

  const deleteMsg = async (id: string) => {
    const q = doc(database, "chats", `${createChatId()}`, "messagas", id);
    try {
      await deleteDoc(q);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = (type: string, files: any) => {
    const storage = getStorage();

    try {
      // Create an array to store the promises of each upload task
      const uploadPromises = files.map((item: any) => {
        const storageRef = ref(
          storage,
          `${type == "message" ? "users" : "profile"}/${item.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, item);
        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              setFileUploadProgress(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
            },
            (error) => {
              toast({ title: "Something went wrong!", variant: "destructive" });
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                  setFileUploadProgress(0);
                  resolve(downloadURL);
                })
                .catch((error) => {
                  reject(error);
                });
            }
          );
        });
      });

      Promise.all(uploadPromises) // Wait for all upload tasks to complete
        .then((downloadURLs: any) => {
          type == "message"
            ? sendMessage(downloadURLs)
            : updateUserProfile(downloadURLs[0]); // All uploads are done, and downloadURLs contains all the file URLs
        })
        .catch((error) => {
          toast({ title: "Something went wrong!", variant: "destructive" });
        });
    } catch (error) {
      toast({ title: "Something went wrong!", variant: "destructive" });
    }
  };

  const uploadAudio = (item: any) => {
    const storage = getStorage();
    const generateUid = new Date().getMilliseconds();
    try {
      const storageRef = ref(storage, `audios/${generateUid}.webm`);
      const uploadTask = uploadBytesResumable(storageRef, item);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setFileUploadProgress(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          toast({ title: "Something went wrong!", variant: "destructive" });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              sendMessage(downloadURL);
              setFileUploadProgress(0);
            })
            .catch((error) => console.log(error));
        }
      );
    } catch (error) {
      toast({ title: "Something went wrong!", variant: "destructive" });
    }
  };

  const value: ChatContextProviderType = {
    chats,
    message,
    chatId,
    fileUploadProgress,
    isRecording,
    isAudioPlaying,
    autoScroll,
    setAutoScroll,
    setIsRecording,
    setIsAudioPlaying,
    setChats,
    setMessage,

    sendMessage,
    uploadFile,
    uploadAudio,
    deleteMsg,

    createChatId,
    toggleChatKey,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContextProvider;
