import { Timestamp } from "firebase/firestore";

export type MsgType = {
  id?: string;
  send: { audio?: string; msg?: string; files?: string[] };
  uid: string;
  timestemp: Timestamp | string;
  seen: boolean;
};
export type ChatIdType = {
  id: string;
  load: boolean;
};
export type ChatContextProviderType = {
  chats: MsgType[];
  message: string;
  chatId: { id: string; load: boolean };
  fileUploadProgress: number;
  isRecording: boolean;
  isAudioPlaying: boolean;
  autoScroll: boolean;
  setChats: React.Dispatch<React.SetStateAction<MsgType[]>>;
  setAutoScroll: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAudioPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
  uploadFile: (type: "message" | "profile", files: File[]) => void;
  uploadAudio: (item: Blob) => void;
  deleteMsg: (id: string) => void;
  createChatId: () => string;
  toggleChatKey: (secKey: string) => void;
};
