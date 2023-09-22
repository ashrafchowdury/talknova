export type AuthUserType = {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
};

export type AuthContextType = {
  currentUser: AuthUserType | any;
  isLoading: boolean;
  singup: (name: string, email: string, password: string) => void;
  login: (email: string, password: string) => void;
  forget: (email: string) => void;
  updateAuthInfo: (name: string) => void;
  logout: () => void;
};

export type ActionsType = {
  toasts?: string;
  direct?: string;
  logic?: any;
  type?: string; // action type like: signup, login
};
