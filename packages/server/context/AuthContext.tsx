"use client";

import React, { useState, useEffect, useContext, createContext } from "react";
import { auth, database } from "../config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  deleteUser,
  onAuthStateChanged,
  sendPasswordResetEmail,
  User,
  UserCredential,
} from "firebase/auth";
import { setDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useCookies } from "@/lib/hooks";
import {
  AuthUserType,
  AuthContextType,
  ActionsType,
  ChildrenType,
} from "../types";
import { toast } from "sonner";

// Context
export const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => useContext(AuthContext)!;

// Provider
const AuthContextProvider: React.FC<ChildrenType> = ({
  children,
}: ChildrenType) => {
  const [currentUser, setCurrentUser] = useState<AuthUserType>(
    {} as AuthUserType
  );
  const [isLoading, setIsLoading] = useState(false);

  // hooks
  const { push } = useRouter();
  const { createSession, removeSession } = useCookies();

  // functions
  const createUserProfile = async (user: AuthUserType) => {
    const firstFriend = `${process.env.NEXT_PUBLIC_FIRST_FRIEND_UID}`;
    await setDoc(doc(database, "users", user.email), {
      uid: user.uid,
      name: user.displayName,
      bio: "Work ipsum dolor sit amet Lorem ipsum dolor sit amet.",
      image: "",
      email: user.email,
      friends: [firstFriend],
      invite: [],
    });
    await updateDoc(
      doc(database, "users", `${process.env.NEXT_PUBLIC_FIRST_FRIEND_EMAIL}`),
      {
        friends: arrayUnion(user.uid),
      }
    );
    await setDoc(
      doc(database, "chats", `${[user.uid, firstFriend].sort().join("")}`),
      {
        key: "",
        uid: [user.uid, firstFriend].sort().join(""),
        lastMsgTime: new Date().toISOString(),
        lastMsg: "",
      }
    );
  };

  const actions = async ({ toasts, direct, logic, type }: ActionsType) => {
    try {
      setIsLoading(true);
      if (logic) {
        const result = (await logic()) as UserCredential;
        if (type == "login") {
          createSession(result?.user.uid);
        } else if (type) {
          await updateProfile(result?.user, { displayName: type });
          await createUserProfile(result?.user as AuthUserType);
          createSession(result?.user.uid);
        }
        setCurrentUser(result?.user as AuthUserType);
        toasts && toast.success(toasts);
        direct && push(direct);
        setIsLoading(false);
      }
    } catch (error: any) {
      if (error.message == "auth/email-already-in-use") {
        toast.error("User with same email already exist");
      } else {
        toast.error("Something went wrong!");
      }
    }
    setIsLoading(false);
  };

  const singup = async (name: string, email: string, password: string) => {
    actions({
      logic: () => createUserWithEmailAndPassword(auth, email, password),
      type: name,
      toasts: "Account Created Successfully",
      direct: "/users",
    });
  };
  const login = async (email: string, password: string) => {
    actions({
      logic: () => signInWithEmailAndPassword(auth, email, password),
      type: "login",
      toasts: "User Login Successfully",
      direct: "/users",
    });
  };

  const forget = async (email: string) => {
    actions({
      logic: () => sendPasswordResetEmail(auth, email),
      toasts: "Check your email",
    });
  };

  const updateAuthInfo = async (name: string) => {};

  const logout = async () => {
    actions({
      logic: () => signOut(auth),
      toasts: "User LogOut Successfully",
      direct: "/",
    });
    removeSession();
  };

  //effects
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setCurrentUser(user as AuthUserType);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const value: AuthContextType = {
    currentUser,
    singup,
    login,
    forget,
    updateAuthInfo,
    logout,
    isLoading,
    setIsLoading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
