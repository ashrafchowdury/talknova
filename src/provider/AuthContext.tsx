"use client";

import React, { useState, useEffect, useContext, createContext } from "react";
import { auth } from "@/server";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  deleteUser,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useToast } from "@/packages/ui";
import { ChildrenType } from "@/types";
import { useRouter } from "next/navigation";

type AuthContextType = {
  currentUser: any;
  singup: (name: string, email: string, password: string) => void;
  login: (email: string, password: string) => void;
  forget: (email: string) => void;
  updateInfo: (name: string) => void;
  logout: () => void;
  isLoading: boolean;
};
type AuthUserType = {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
};
type ActionsType = {
  toasts?: string;
  direct?: string;
  logic?: any;
};

export const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => useContext(AuthContext)!;

const AuthContextProvider: React.FC<ChildrenType> = ({
  children,
}: ChildrenType) => {
  const [currentUser, setCurrentUser] = useState<AuthUserType | {}>({});
  const [isLoading, setIsLoading] = useState(false);
  // hooks
  const { toast } = useToast();
  const { push } = useRouter();

  // functions
  const actions = async ({ toasts, direct, logic }: ActionsType) => {
    try {
      setIsLoading(true);
      const result = await logic();
      setCurrentUser(result?.user ?? {});
      toasts && toast({ title: toasts });
      direct && push(direct);
      setIsLoading(false);
    } catch (error: any) {
      if (error.message == "auth/email-already-in-use") {
        toast({ variant: "destructive", title: "User already exist" });
      } else {
        toast({ variant: "destructive", title: "Something went wrong!" });
      }
    }
  };

  const singup = async (name: string, email: string, password: string) => {
    actions({
      logic: () => createUserWithEmailAndPassword(auth, email, password),
      toasts: "Account Created Successfully",
      direct: "/users",
    });
  };
  const login = async (email: string, password: string) => {
    actions({
      logic: () => signInWithEmailAndPassword(auth, email, password),
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

  const updateInfo = async (name: string) => {
    // try {
    //   const update = await updateProfile(currentUser, {
    //     displayName: name
    //   })
    // } catch (error) {
    //   toast({ variant: "destructive", title: "Something wwent wrong!" });
    // }
  };

  const logout = async () => {
    actions({
      logic: () => signOut(auth),
      toasts: "User LogOut Successfully",
      direct: "/",
    });
  };

  //effects
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      setCurrentUser(user);
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
    updateInfo,
    logout,
    isLoading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
