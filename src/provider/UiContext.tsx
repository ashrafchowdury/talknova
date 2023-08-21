"use client";
// This context contines all the UI related logics

import React, { useState, useEffect, useContext, createContext } from "react";
import { ChildrenType } from "@/types";

type TypeUiContextProvider = {
  windowSize: number;
};

export const UiContext = createContext<TypeUiContextProvider | null>(null);
export const useUI = () => useContext(UiContext)!;

const UiContextProvider: React.FC<ChildrenType> = ({
  children,
}: ChildrenType) => {
  const [windowSize, setWindowSize] = useState(0);

  useEffect(() => {
    const getWindowSize = () => {
      setWindowSize(window.innerWidth);
    };
    getWindowSize();
    window.addEventListener("resize", getWindowSize);
    return () => {
      window.removeEventListener("resize", getWindowSize);
    };
  }, []);

  const value: TypeUiContextProvider = { windowSize };
  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
};

export default UiContextProvider;
