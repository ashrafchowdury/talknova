export type MsgType = {
  id?: string;
  send: { audio?: string; msg?: string; image?: string };
  uid: string;
  timestemp: any;
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
  uploadFile: (type: "message" | "profile", files: any) => void;
  uploadAudio: (item: any) => void;
  deleteMsg: (id: string) => void;
  createChatId: () => string;
  toggleChatKey: (secKey: string) => void;
};
