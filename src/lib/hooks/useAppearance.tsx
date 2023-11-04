"use client";
import { useState, useEffect, useContext, createContext } from "react";
import { useUsers } from "@/packages/server/context/UserContext";
import { useLS } from ".";
import { ChildrenType } from "@/types";
import { useSearchParams } from "next/navigation";
import { UserType } from "@/packages/server/types";

type AppearanceContextProviderType = {
  userAppearance: string;
  setUserAppearance: React.Dispatch<React.SetStateAction<string>>;
  changeUserAppearance: (value: string) => void;
};
export const AppearanceContext =
  createContext<AppearanceContextProviderType | null>(null);
export const useAppearance = () => useContext(AppearanceContext)!;

const AppearanceContextProvider: React.FC<ChildrenType> = ({
  children,
}: ChildrenType) => {
  const [userAppearance, setUserAppearance] = useState("");
  const id: any = useSearchParams().get("id");
  const { friends } = useUsers();
  const { getItem, setItem, removeItem } = useLS();
  const user: UserType = friends.filter((item) => item.uid == id)[0];

  const changeUserAppearance = (value: string) => {
    if (value == "bg-primary") {
      removeItem(user?.uid);
    } else {
      setItem(user?.uid, value);
    }
    setUserAppearance(value);
  };
  useEffect(() => {
    setUserAppearance(getItem(user?.uid));
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
