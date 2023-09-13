"use client";
// This context contines all the UI related logics
import React, { useState, useEffect, useContext, createContext } from "react";
import { ChildrenType, UsersType, UserType } from "@/types";
import {
  doc,
  setDoc,
  onSnapshot,
  collection,
  query,
  deleteDoc,
  where,
  updateDoc,
  arrayRemove,
  arrayUnion,
  orderBy,
  limit,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { database } from "@/server";
import { useAuth } from "./AuthContext";
import { generateUid } from "@/lib/functions";
import { useCookies } from "@/lib/hooks";
import { toast } from "@/packages/ui/hooks/use-toast";

type TypeUserContextProvider = {
  userId: string;
  selectedUser: UsersType | any;
  user: UserType[];
  invite: UserType[];
  friends: UserType[];
  myself: UserType;
  isLoading: boolean;
  chats: any;
  message: string | string[] | null;
  selectFiles: string[] | [];
  fileUploadProgress: number;
  setSelectFiles: React.Dispatch<React.SetStateAction<string[] | []>>;
  audio: any;
  isRecording: boolean;
  isAudioPlaying: boolean;
  setAudio: React.Dispatch<React.SetStateAction<any>>;
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAudioPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string | string[] | null>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  getSelectedUser: (id: string) => void;
  getAllUsers: () => void;
  getUserFriends: (id: string[]) => void;
  inviteUser: (email: string) => void;
  getUserInvitations: (id: string[]) => void;
  acceptUserInvite: (id: string, userEmail: string) => void;
  rejectUserInvite: (id: string) => void;
  createChatDatabase: () => void;
  getChats: () => void;
  sendMessage: () => void;
  uploadFile: (fileName: string) => void;
  uploadAudio: (item: any) => void;
  deleteMsg: (id: string) => void;
};

export const UserContext = createContext<TypeUserContextProvider | null>(null);
export const useUsers = () => useContext(UserContext)!;

const UserContextProvider: React.FC<ChildrenType> = ({
  children,
}: ChildrenType) => {
  // states
  const [myself, setMyself] = useState<UserType | any>({});
  const [user, setUser] = useState<UserType[]>([]);
  const [friends, setFriends] = useState<UserType[]>([]); // user friends
  const [invite, setInvite] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | any>({}); // first user
  const [userId, setUserId] = useState(""); // selected user id
  const [isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState<any>([]); // user chats
  const [files, setFiles] = useState([]); // sended files
  const [message, setMessage] = useState<string | string[] | null>(null); // input message
  const [selectFiles, setSelectFiles] = useState<string[] | []>([]); // selected files
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [audio, setAudio] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  //hooks
  const { currentUser } = useAuth();
  const { uid } = useCookies();

  //functions
  const getAllUsers = () => {
    const q = query(collection(database, "users"));
    onSnapshot(q, (snapshot) => {
      const data: any = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const filterData = data.filter(
        (item: UserType) => item.uid !== currentUser.uid
      );
      setUser(filterData);
    });
  };

  const getCurrentUser = () => {
    const q = query(collection(database, "users"), where("uid", "==", uid));
    const userData = onSnapshot(q, (snapshot) => {
      const data: any = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))[0];
      setMyself(data);
      if (data?.friends?.length > 0) {
        getUserFriends(data.friends);
      }
      data?.invite?.length > 0 && getUserInvitations(data.invite);
    });
  };

  const getUserFriends = (id: string[]) => {
    const q = query(collection(database, "users"), where("uid", "in", id));
    onSnapshot(q, (snapshot) => {
      const data: any = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFriends(data);
      setSelectedUser(data[0]);
      window.location.hash = `${data[0]?.uid}`;
      setUserId(`${data[0]?.uid}`);
      getLastMsg(data);
    });
    setIsLoading(false);
  };

  const getUserInvitations = (id: string[]) => {
    const q = query(collection(database, "users"), where("uid", "in", id));
    onSnapshot(q, (snapshot) => {
      setInvite(
        snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };

  const inviteUser = async (email: string) => {
    try {
      await updateDoc(doc(database, "users", email), {
        invite: arrayUnion(uid),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const acceptUserInvite = async (id: string, userEmail: string) => {
    await updateDoc(doc(database, "users", `${currentUser.email}`), {
      friends: arrayUnion(id),
      invite: arrayRemove(id),
    });
    await updateDoc(doc(database, "users", `${userEmail}`), {
      friends: arrayUnion(uid),
    });
    getCurrentUser();
  };

  const rejectUserInvite = async (id: string) => {
    await updateDoc(doc(database, "users", `${currentUser.email}`), {
      invite: arrayRemove(id),
    });
  };

  const getSelectedUser = (id: string) => {
    const filter: any = friends.filter((data: any) => data.uid == id);
    setSelectedUser(filter[0]);
  };

  const updateUserProfile = async (
    name?: string,
    image?: string,
    bio?: string
  ) => {
    const updatedFields: any = {};

    if (name) updatedFields.name = name;
    if (image) updatedFields.image = image;
    if (bio) updatedFields.bio = bio;

    if (Object.keys(updatedFields).length > 0) {
      await updateDoc(
        doc(database, "users", `${currentUser.email}`),
        updatedFields
      );
    }
  };

  const createChatId = () => {
    const combinedUid = [currentUser.uid, selectedUser.uid].sort().join("");
    return combinedUid;
  };

  const getLastMsg = (friendData: any) => {
    try {
      const q = query(collection(database, "chats"), limit(50));
      onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc: any) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const friendsWithMsgs = friendData.map((friend: any) => {
          const matchingData = data.find((item) => {
            const users = item.users.split(" & ");
            return users.includes(friend.name);
          });
          if (matchingData) {
            const msg = matchingData.lastMsg.split(" | ");
            friend.lastMsg = `${msg[1] == uid ? "You:" : "They:"} ${msg[0]}`;
            friend.lastMsgTime = matchingData.lastMsgTime;
          }
          return friend;
        });
        setFriends(friendsWithMsgs);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getChats = () => {
    try {
      const q = query(
        collection(database, "chats", `${createChatId()}`, "messagas"),
        orderBy("timestemp", "asc"),
        limit(50)
      );
      onSnapshot(q, (snapshot) => {
        setChats(
          snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
        );
      });
    } catch (error) {
      console.log(error);
    }
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
        if (typeof message === "string") {
          msg = { msg: message };
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
          uid: currentUser.uid,
        });
        await updateDoc(doc(database, "chats", `${createChatId()}`), {
          lastMsgTime: new Date().toISOString(),
          lastMsg: `${lastMsg} | ${uid}`,
        });
        setMessage(null);
      }
    } catch (error) {
      toast({ title: "Something went wrong!", variant: "destructive" });
    }
  };

  const createChatDatabase = () => {
    setDoc(doc(database, "chats", `${createChatId()}`), {
      users: `${myself.name} & ${selectedUser.name}`,
    })
      .then((res) => sendMessage())
      .catch((err) => console.log(err));
  };

  const deleteMsg = async (id: string) => {
    const q = doc(database, "chats", `${createChatId()}`, "messagas", id);
    try {
      await deleteDoc(q);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = (filePath: string) => {
    const storage = getStorage();

    try {
      // Create an array to store the promises of each upload task
      const uploadPromises = selectFiles.map((item: any) => {
        const storageRef = ref(storage, `${filePath}/${item.name}`);
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
          sendMessage(downloadURLs); // All uploads are done, and downloadURLs contains all the file URLs
          setSelectFiles([]);
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
              setAudio(null);
            })
            .catch((error) => console.log(error));
        }
      );
    } catch (error) {
      toast({ title: "Something went wrong!", variant: "destructive" });
    }
  };

  // effects
  useEffect(() => {
    getCurrentUser();
  }, []);
  useEffect(() => {
    setChats([]);
    getChats();
  }, [userId]);

  const value: TypeUserContextProvider = {
    userId,
    setUserId,
    selectedUser,
    user,
    invite,
    friends,
    isLoading,
    chats,
    audio,
    isRecording,
    isAudioPlaying,
    setAudio,
    setIsRecording,
    setIsAudioPlaying,
    fileUploadProgress,
    myself,
    getSelectedUser,
    getAllUsers,
    inviteUser,
    getUserFriends,
    getUserInvitations,
    acceptUserInvite,
    rejectUserInvite,
    getChats,
    createChatDatabase,
    sendMessage,
    message,
    setMessage,
    selectFiles,
    setSelectFiles,
    uploadFile,
    deleteMsg,
    uploadAudio,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
