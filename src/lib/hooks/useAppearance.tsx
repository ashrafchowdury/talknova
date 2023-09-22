import { useState, useEffect, useContext, createContext } from "react";
import { useUsers } from "@/packages/server";
import { useLS } from ".";
import { ChildrenType } from "@/types";

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
  const { selectedUser } = useUsers();
  const { getItem, setItem, removeItem } = useLS();

  const changeUserAppearance = (value: string) => {
    if (value == "bg-primary") {
      removeItem(selectedUser.uid);
    } else {
      setItem(selectedUser.uid, value);
    }
    setUserAppearance(value);
  };
  useEffect(() => {
    setUserAppearance(getItem(selectedUser.uid));
  }, [selectedUser]);

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
