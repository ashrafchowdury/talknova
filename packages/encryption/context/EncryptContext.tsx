import React, { useState, useContext, createContext } from "react";
import CryptoJS from "crypto-js";

type EncryptContextType = {
  key: string;
  setKey: React.Dispatch<React.SetStateAction<string>>;
  encryptData: (data: any) => void;
  decryptData: (data: any) => void;
  isEncrypt: boolean;
  setIsEncrypt: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [isEncrypt, setIsEncrypt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const encryptData = (data: any) => {
    const encryptedData = CryptoJS.AES.encrypt(data, key).toString();
    return encryptedData;
  };
  const decryptData = (data: any) => {
    const decryptedData = CryptoJS.AES.decrypt(data, key).toString(
      CryptoJS.enc.Utf8
    );
    return decryptedData;
  };
  const value: EncryptContextType = {
    key,
    setKey,
    encryptData,
    decryptData,
    isEncrypt,
    setIsEncrypt,
    isLoading,
    setIsLoading,
  };
  return (
    <EncryptContext.Provider value={value}>{children}</EncryptContext.Provider>
  );
};

export default EncryptContextProvider;
