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
  getSelectedUser: (id: string) => void;
};

export const UserContext = createContext<TypeUserContextProvider | null>(null);
export const useUsers = () => useContext(UserContext)!;

const UserContextProvider: React.FC<ChildrenType> = ({
  children,
}: ChildrenType) => {
  // states
  const [users, setUsers] = useState(filterUsers);
  const [selectedUser, setSelectedUser] = useState(filterUsers[0]);
  const [userId, setUserId] = useState("");
  // effects
  useEffect(() => {
    window.location.hash = `${selectedUser.id}`;
    setUserId(`${selectedUser.id}`);
  }, []);

  //functions
  const getSelectedUser = (id: string) => {
    const filter = users.filter((data) => data.id == id);
    setSelectedUser(filter[0]);
  };

  const value: TypeUserContextProvider = {
    users,
    userId,
    setUserId,
    selectedUser,
    getSelectedUser,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
