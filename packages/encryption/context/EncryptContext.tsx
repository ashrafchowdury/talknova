"use client";
import React, { useState, useContext, createContext } from "react";
import CryptoJS from "crypto-js";

type EncryptContextType = {
  key: string;
  setKey: React.Dispatch<React.SetStateAction<string>>;
  encryptData: (data: string, key: string) => void;
  decryptData: (data: string, key: string) => string;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isAutoLock: boolean;
  setIsAutoLock: React.Dispatch<React.SetStateAction<boolean>>;
  toggleLockUi: boolean;
  setToggleLockUi: React.Dispatch<React.SetStateAction<boolean>>;
};
type ChildrenType = {
  children: React.ReactNode;
};
export const EncryptContext = createContext<EncryptContextType | null>(null);
export const useEncrypt = () => useContext(EncryptContext)!;

const EncryptContextProvider: React.FC<ChildrenType> = ({
  children,
}: ChildrenType) => {
  const [key, setKey] = useState("");
  const [isAutoLock, setIsAutoLock] = useState(false);
  const [toggleLockUi, setToggleLockUi] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const encryptData = (data: string, key: string) => {
    try {
      const encryptedData = CryptoJS.AES.encrypt(data, key)?.toString();
      return encryptedData;
    } catch (error) {
      console.log(error);
      return data;
    }
  };
  const decryptData = (data: string, key: any): string => {
    try {
      const decryptedData = CryptoJS.AES.decrypt(data, key)?.toString(
        CryptoJS.enc.Utf8
      );
      return decryptedData;
    } catch (error) {
      return data;
    }
  };
  const value: EncryptContextType = {
    key,
    setKey,
    encryptData,
    decryptData,
    isLoading,
    setIsLoading,
    isAutoLock,
    setIsAutoLock,
    toggleLockUi,
    setToggleLockUi,
  };
  return (
    <EncryptContext.Provider value={value}>{children}</EncryptContext.Provider>
  );
};

export default EncryptContextProvider;
