"use client";

import React, { useState, useEffect, useContext, createContext } from "react";
import {
  TypeUserContextProvider,
  UserType,
  ChildrenType,
  LastMsgType,
} from "../types";
import {
  doc,
  setDoc,
  onSnapshot,
  collection,
  query,
  where,
  updateDoc,
  arrayRemove,
  arrayUnion,
  getDocs,
} from "firebase/firestore";
import { database } from "../config";
import { useCookies } from "@/lib/hooks";
import { toast } from "@/packages/ui/hooks/use-toast";
import useActive from "../hook/useActive";

export const UserContext = createContext<TypeUserContextProvider | null>(null);
export const useUsers = () => useContext(UserContext)!;

const UserContextProvider: React.FC<ChildrenType> = ({
  children,
}: ChildrenType) => {
  const [myself, setMyself] = useState<UserType | any>({});
  const [user, setUser] = useState<UserType[]>([]);
  const [friends, setFriends] = useState<UserType[]>([]);
  const [invite, setInvite] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  //hooks
  const { uid } = useCookies();
  useActive(isLoading, async (status) => {
    if (myself.id) {
      activeStatus(status);
    }
  });

  //functions
  const getAllUsers = () => {
    const q = query(collection(database, "users"));
    onSnapshot(q, (snapshot) => {
      const data: any = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const filterData = data.filter((item: UserType) => item.uid !== uid);
      setUser(filterData);
    });
  };

  const getCurrentUser = async () => {
    const q = query(collection(database, "users"), where("uid", "==", uid));
    const snapshot = await getDocs(q);
    const data: any = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))[0];
    setMyself(data);
    data?.friends?.length > 0 && getUserFriends(data.friends);
    data?.invite?.length > 0 && getUserInvitations(data.invite);
  };

  const activeStatus = async (status: boolean) => {
    await updateDoc(doc(database, "users", `${myself.id}`), {
      active: status,
    });
  };

  const getUserFriends = async (id: string[]) => {
    try {
      const q = query(collection(database, "users"), where("uid", "in", id));
      const snapshot = await getDocs(q);
      const data: any = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      if (data.length > 0) {
        setFriends(data);
        await getLastMsg(data, id);
      }
    } catch (error) {
      console.error("Error in getUserFriends:", error);
    }
  };

  const getLastMsg = async (friendData: UserType[], id: string[]) => {
    try {
      const ids = id.map((item) => [uid, item].sort().join(""));
      const q = query(collection(database, "chats"), where("uid", "in", ids));
      onSnapshot(q, (snapshot) => {
        const data: any = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const friendsLastMsgs = friendData.map((value: any) => {
          const matchingFriend = data.find(
            (item: any) => item.uid === [uid, value.uid].sort().join("")
          );
          return { ...value, ...matchingFriend, uid: value.uid };
        });

        setFriends(friendsLastMsgs);
        setIsLoading(false);
      });
    } catch (error) {
      console.error("Error in getLastMsg:", error);
    }
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
    await updateDoc(doc(database, "users", `${myself.id}`), {
      friends: arrayUnion(id),
      invite: arrayRemove(id),
    });
    await updateDoc(doc(database, "users", `${userEmail}`), {
      friends: arrayUnion(uid),
    });
    await setDoc(doc(database, "chats", `${[uid, id].sort().join("")}`), {
      key: "",
      uid: [uid, id].sort().join(""),
      lastMsgTime: new Date().toISOString(),
      lastMsg: "",
    });
    getCurrentUser();
  };

  const rejectUserInvite = async (id: string) => {
    await updateDoc(doc(database, "users", `${myself.id}`), {
      invite: arrayRemove(id),
    });
  };

  const updateUserProfile = async (
    image?: string,
    name?: string,
    bio?: string
  ) => {
    const updatedFields: any = {};

    if (name) updatedFields.name = name;
    if (image) updatedFields.image = image;
    if (bio) updatedFields.bio = bio;

    if (Object.keys(updatedFields).length > 0) {
      try {
        await updateDoc(doc(database, "users", `${myself.id}`), updatedFields);
        toast({ title: "Profile updated successfully" });
      } catch (error) {
        toast({ title: "Something went wrong!", variant: "destructive" });
      }
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const value: TypeUserContextProvider = {
    user,
    invite,
    friends,
    isLoading,
    myself,
    getAllUsers,
    inviteUser,
    getUserFriends,
    getUserInvitations,
    acceptUserInvite,
    rejectUserInvite,
    updateUserProfile,
    activeStatus,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
