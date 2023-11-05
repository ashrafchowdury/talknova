"use client";
import { useState, useEffect, useContext, createContext } from "react";
import { useUsers } from "@/packages/server/context/UserContext";
import { ChildrenType } from "@/types";
import { useSearchParams } from "next/navigation";
import { UserType } from "@/packages/server/types";
import { useLocalStorage } from "@uidotdev/usehooks";

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
  const [getData, setData] = useLocalStorage(id);
  const { friends } = useUsers();
  const user: UserType = friends.filter((item) => item.uid == id)[0];

  const changeUserAppearance = (value: string) => {
    if (value == "bg-primary") {
      localStorage.removeItem(id);
    } else {
      setData(value);
    }
    setUserAppearance(value);
  };
  useEffect(() => {
    setUserAppearance(getData as string);
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
