"use client";
// This context contines all the UI related logics
import React, { useState, useEffect, useContext, createContext } from "react";
import { ChildrenType, UsersType } from "@/types";
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
} from "firebase/firestore";
import { database } from "@/server";
import { useAuth } from "./AuthContext";
import { generateUid } from "@/lib/functions";
import { useCookies } from "@/lib/hooks";

type TypeUserContextProvider = {
  users: UsersType[];
  userId: string;
  setUserId: any;
  selectedUser: any;
  getSelectedUser: (id: string) => void;
  getAllUsers: () => void;
  user: any;
  getUserFriends: any;
  inviteUser: any;
  getUserInvitations: any;
  invite: any;
};

export const UserContext = createContext<TypeUserContextProvider | null>(null);
export const useUsers = () => useContext(UserContext)!;

const UserContextProvider: React.FC<ChildrenType> = ({
  children,
}: ChildrenType) => {
  // states
  const [myself, setMyself] = useState<any>({});
  const [users, setUsers] = useState<any>(filterUsers); // all users
  const [user, setUser] = useState<any>([]);
  const [friends, setFriends] = useState<any>([]); // user friends
  const [invite, setInvite] = useState<any>([]);
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
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const filterData = data.filter(
        (value: any) => value.uid !== currentUser.uid
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
    });
  };

  const getUserFriends = (id: string[]) => {
    const q = query(collection(database, "users"), where("uid", "in", id));
    onSnapshot(q, (snapshot) => {
      const frined = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFriends(frined);
    });
  };

  const getUserInvitations = () => {
    const q = query(
      collection(database, "users"),
      where("uid", "in", myself.invite)
    );
    onSnapshot(q, (snapshot) => {
      setInvite(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  // to invite a user, we have access the his invite db and then we have create a doc wiht our information
  const inviteUser = async (email: any) => {
    try {
      await updateDoc(doc(database, "users", email), {
        invite: [uid],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const acceptUserInvite = async (email: any, id: any) => {
    await updateDoc(doc(database, "users", email), {
      friends: [id],
      invite: [...id],
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
    getSelectedUser,
    getAllUsers,
    user,
    getUserFriends,
    inviteUser,
    getUserInvitations,
    invite,
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
