export type UsersType = {
  id: string;
  name: string;
  bio: string;
  image: string;
  msg: string;
  active: boolean;
  date: string;
};

export type UserType = {
  id: string;
  uid: string;
  name: string;
  bio: string;
  image: string;
  date: string;
  friends: string[];
  invite: string[];
};
