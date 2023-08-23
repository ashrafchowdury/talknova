"use client";
// This context contines all the UI related logics

import React, { useState, useEffect, useContext, createContext } from "react";
import { ChildrenType } from "@/types";

type TypeUiContextProvider = {
  windowSize: number;
  userAppearance: string;
  setUserAppearance: React.Dispatch<React.SetStateAction<string>>;
};

export const UiContext = createContext<TypeUiContextProvider | null>(null);
export const useUI = () => useContext(UiContext)!;

const UiContextProvider: React.FC<ChildrenType> = ({
  children,
}: ChildrenType) => {
  const [windowSize, setWindowSize] = useState(0);
  const [appearance, setAppearance] = useState("black");
  const [userAppearance, setUserAppearance] = useState("black");

  useEffect(() => {
    const getWindowSize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener("resize", getWindowSize);
    setWindowSize(window.innerWidth);
    return () => {
      window.removeEventListener("resize", getWindowSize);
    };
  }, []);

  const value: TypeUiContextProvider = {
    windowSize,
    userAppearance,
    setUserAppearance,
  };
  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
};

export default UiContextProvider;
