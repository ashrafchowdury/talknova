import { memo, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/packages/ui";
import { User } from "@/lib/types";
import { Button } from "@/packages/ui";
import { Avatar } from "@/components";
import UserCard from "./user-card";

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

  useEffect(() => {
    getData();
    console.log("data called");
  }, []);

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="xl:!w-[800px]">
        <DialogHeader>
          <DialogTitle>All Users</DialogTitle>
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
