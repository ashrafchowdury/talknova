export type UserType = {
  id: string;
  uid: string;
  name: string;
  bio: string;
  image: string;
  date: string;
  friends: string[];
  invite: string[];
  lastMsg?: string;
  lastMsgTime: string | Date;
  key?: string;
  active?: boolean;
  typing: {
    user: string;
    istyping: boolean;
  };
};
export type LastMsgType = {
  id: string;
  lastMsg: string;
  lastMsgTime: string;
  uid: string;
};

export type TypeUserContextProvider = {
  user: UserType[];
  invite: UserType[];
  friends: UserType[];
  myself: UserType;
  isLoading: boolean;
  getAllUsers: () => void;
  getUserFriends: (id: string[]) => void;
  inviteUser: (email: string) => void;
  getUserInvitations: (id: string[]) => void;
  acceptUserInvite: (id: string, userEmail: string) => void;
  rejectUserInvite: (id: string) => void;
  updateUserProfile: (name?: string, image?: string, bio?: string) => void;
  activeStatus: (status: boolean) => void;
};
