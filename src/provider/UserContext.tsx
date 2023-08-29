"use client";
// This context contines all the UI related logics
import React, { useState, useEffect, useContext, createContext } from "react";
import { ChildrenType, UsersType, UserType } from "@/types";
import { users as filterUsers } from "@/lib/functions";
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
} from "firebase/firestore";
import { database } from "@/server";
import { useAuth } from "./AuthContext";
import { generateUid } from "@/lib/functions";
import { useCookies } from "@/lib/hooks";

type TypeUserContextProvider = {
  users: UsersType[];
  userId: string;
  selectedUser: UsersType;
  user: UserType[];
  invite: UserType[];
  friends: UserType[];
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  getSelectedUser: (id: string) => void;
  getAllUsers: () => void;
  getUserFriends: (id: string[]) => void;
  inviteUser: (email: string) => void;
  getUserInvitations: (id: string[]) => void;
  acceptUserInvite: (id: string) => void;
  rejectUserInvite: (id: string) => void;
};

export const UserContext = createContext<TypeUserContextProvider | null>(null);
export const useUsers = () => useContext(UserContext)!;

const UserContextProvider: React.FC<ChildrenType> = ({
  children,
}: ChildrenType) => {
  // states
  const [myself, setMyself] = useState<UserType | {}>({});
  const [users, setUsers] = useState<any>(filterUsers); // all users
  const [user, setUser] = useState<UserType[]>([]);
  const [friends, setFriends] = useState<UserType[]>([]); // user friends
  const [invite, setInvite] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState(filterUsers[0]); // first user
  const [userId, setUserId] = useState(""); // selected user id
  const [chats, setChats] = useState([]); // user chats
  const [files, setFiles] = useState([]); // sended files
  const [messages, setMessages] = useState(""); // input message
  const [selectFiles, setSelectFiles] = useState([]); // selected files

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
      data.friends.length > 0 && getUserFriends(data.friends);
      data?.invite.length > 0 && getUserInvitations(data.invite);
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
    });
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

  const acceptUserInvite = async (id: string) => {
    await updateDoc(doc(database, "users", `${currentUser.email}`), {
      friends: arrayUnion(id),
      invite: arrayRemove(id),
    });
    getCurrentUser();
  };

  const rejectUserInvite = async (id: string) => {
    await updateDoc(doc(database, "users", `${currentUser.email}`), {
      invite: arrayRemove(id),
    });
  };

  const getSelectedUser = (id: string) => {
    const filter = users.filter((data: any) => data.id == id);
    setSelectedUser(filter[0]);
  };

  const updateUserProfile = (email: string, name: string) => {};

  const createChatDatabase = async () => {
    // await setDoc(doc(db, "message", `${myId?.uid + userId?.uid}`), {
    //   fistUserName: displayName,
    //   secondUserName: userId?.name,
    // });
  };

  const getChats = () => {
    //  const q = query(
    //    collection(db, "message", `${myId?.uid + userId?.uid}`, "data"),
    //    orderBy("timestemp", "asc")
    //  );
    //  const userData = onSnapshot(q, (snapshot) => {
    //    setmessage(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //  });
    //        scroll(800);
  };

  const sendNewMsg = async () => {
    // const q = query(
    //   collection(db, "message", `${myId?.uid + userId?.uid}`, "data")
    // );
    // if (!input && !image) {
    //   toast.error("Please Write Someting");
    // } else {
    //   await addDoc(q, {
    //     img: image,
    //     msg: input,
    //     timestemp: serverTimestamp(),
    //     uid: currentUser.uid,
    //     time: `${new Date()}`,
    //   });
    //   setinput("");
    //   setimage("");
    // }
  };

  const deleteMsg = async () => {};

  // effects
  useEffect(() => {
    window.location.hash = `${selectedUser.id}`;
    setUserId(`${selectedUser.id}`);
    getCurrentUser();
  }, []);

  const value: TypeUserContextProvider = {
    users,
    userId,
    setUserId,
    selectedUser,
    user,
    invite,
    friends,
    getSelectedUser,
    getAllUsers,
    inviteUser,
    getUserFriends,
    getUserInvitations,
    acceptUserInvite,
    rejectUserInvite,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;

/*
Notes:

User friends: To save user friends, we will create a friends array on our doc and it will contines all our friends uid, then we will use the uid to get the friends data from user collections.
User invites: Same as user friends.
After acsepting invitation: we will delete the uid from invite array and add on the friends array.

*/
