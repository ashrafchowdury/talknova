"use client";
import { ListOfUsers, Chat, UserSettings } from "@/components";
import { useUI } from "@/provider";

const Users = () => {
  const { windowSize } = useUI();
  return (
    <main className="w-full flex justify-center">
      <ListOfUsers />
      {windowSize > 1025 && <Chat className="lg:w-[600px] xl:w-[50%]" />}

      {windowSize > 1350 && <UserSettings className="w-[350px]" />}
    </main>
  );
};

export default Users;
