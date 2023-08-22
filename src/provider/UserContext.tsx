"use client";
// This context contines all the UI related logics
import React, { useState, useEffect, useContext, createContext } from "react";
import { ChildrenType, UsersType } from "@/types";
import { users as filterUsers } from "@/lib/functions";

type TypeUserContextProvider = {
  users: UsersType[];
  userId: string;
  setUserId: any;
  selectedUser: any;
};

export const UserContext = createContext<TypeUserContextProvider | null>(null);
export const useUsers = () => useContext(UserContext)!;

const UserContextProvider: React.FC<ChildrenType> = ({
  children,
}: ChildrenType) => {
  const [users, setUsers] = useState(filterUsers);
  const [selectedUser, setSelectedUser] = useState({});
  const [userId, setUserId] = useState(window.location.search);

  useEffect(() => {
    const filter = users.filter((data) => data.id == userId);
    setSelectedUser(filter[0]);
  }, [userId]);

  const value: TypeUserContextProvider = {
    users,
    userId,
    setUserId,
    selectedUser,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
