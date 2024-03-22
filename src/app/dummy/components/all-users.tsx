import { memo, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/packages/ui";
import { User } from "@/lib/types";
import UserCard from "./user-card";
import ReloadButton from "./reload-button";

const AllUsers = ({ children }: any) => {
  const [allUsers, setAllUsers] = useState<User[]>([]);

  async function getData() {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setAllUsers(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const sendRequest = async (requestId: string) => {
    try {
      const res = await fetch("/api/user/requests", {
        method: "POST",
        body: JSON.stringify({ invitedUserId: requestId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      setAllUsers(allUsers.filter((user) => user.id !== requestId));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="xl:!w-[800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            All Users <ReloadButton action={() => getData()} />
          </DialogTitle>
        </DialogHeader>

        <section className="flex flex-col space-y-3">
          {allUsers.map((user) => (
            <UserCard
              user={user}
              label="Send"
              action={() => sendRequest(user.id)}
            />
          ))}
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default memo(AllUsers);
