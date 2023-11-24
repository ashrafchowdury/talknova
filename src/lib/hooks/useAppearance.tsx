"use client";
import React, { useState, useEffect, useContext, createContext } from "react";
import { useUsers } from "@/packages/server/context/UserContext";
import { useSearchParams } from "next/navigation";
import { UserType } from "@/packages/server";
import { useLocalStorage } from ".";

type AppearanceContextProviderType = {
  userAppearance: string;
  setUserAppearance: React.Dispatch<React.SetStateAction<string>>;
  changeUserAppearance: (value: string) => void;
};
type ChildrenType = {
  children: React.ReactNode;
};

export const AppearanceContext =
  createContext<AppearanceContextProviderType | null>(null);
export const useAppearance = () => useContext(AppearanceContext)!;

const AppearanceContextProvider: React.FC<ChildrenType> = ({
  children,
}: ChildrenType) => {
  const [userAppearance, setUserAppearance] = useState("");
  const id = useSearchParams().get("id") as string;
  const { setItem, getItem, removeItem } = useLocalStorage(id);
  const { friends } = useUsers();
  const user: UserType = friends.filter((item) => item.uid == id)[0];

  const changeUserAppearance = (value: string) => {
    if (value == "bg-primary") {
      removeItem();
    } else {
      setItem(value);
    }
    setUserAppearance(value);
  };
  useEffect(() => {
    const item = getItem();
    setUserAppearance(item);
  }, [user?.uid]);

  const value: AppearanceContextProviderType = {
    userAppearance,
    setUserAppearance,
    changeUserAppearance,
  };
  return (
    <AppearanceContext.Provider value={value}>
      {children}
    </AppearanceContext.Provider>
  );
};

export default AppearanceContextProvider;
