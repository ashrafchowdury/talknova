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
};
type AuthUserType = {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
};
export const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => useContext(AuthContext)!;

const AuthContextProvider: React.FC<ChildrenType> = ({
  children,
}: ChildrenType) => {
  const [currentUser, setCurrentUser] = useState<AuthUserType | {}>({});
  // hooks
  const { toast } = useToast();
  const { push } = useRouter();

  // functions
  const singup = async (name: string, email: string, password: string) => {
    try {
      const createAccount = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCurrentUser(createAccount.user);
      toast({ title: "Account Created Successfully" });
      push("/users");
    } catch (error: any) {
      if (error.message == "auth/email-already-in-use") {
        toast({ variant: "destructive", title: "User already exist" });
      } else {
        toast({ variant: "destructive", title: "Something went wrong!" });
      }
    }
  };
  const login = async (email: string, password: string) => {
    try {
      const userLogin = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userLogin.user);
      toast({ title: "User Login Successfully" });
      push("/users");
    } catch (error: any) {
      console.log(error);
      toast({ variant: "destructive", title: "Something went wrong!" });
    }
  };

  const forget = async (email: string) => {
    try {
      const forgetPassword = await sendPasswordResetEmail(auth, email);
      toast({ title: "Check your email" });
    } catch (error) {
      toast({ variant: "destructive", title: "Something wwent wrong!" });
    }
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
    try {
      const logoutUser = await signOut(auth);
      setCurrentUser({});
      toast({ title: "User LogOut Successfully" });
      push("/");
    } catch (error) {
      toast({ variant: "destructive", title: "Something wwent wrong!" });
    }
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
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
