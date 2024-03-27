"use client";

import { useState, memo, useEffect } from "react";
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/packages/ui";
import { toast } from "sonner";
import { User } from "@/lib/types";
import UserCard from "./user-card";
import ReloadButton from "./reload-button";

type RequestsType = {
  received: User[];
  send: User[];
};

const Requests = ({ children }: any) => {
  const [requests, setRequests] = useState<RequestsType>({
    received: [],
    send: [],
  });

  const getData = async () => {
    try {
      const res = await fetch("/api/user/requests");
      const data = await res.json();

      setRequests({
        received: data.received,
        send: data.send,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const acceptRequest = async (requestId: string, index: number) => {
    try {
      const res = await fetch("/api/user/requests", {
        method: "PATCH",
        body: JSON.stringify({ receiverId: requestId, index }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const rejectRequest = async (requestId: string, index: number) => {
    try {
      const res = await fetch("/api/user/requests", {
        method: "DELETE",
        body: JSON.stringify({ receiverId: requestId, index }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      setRequests({
        received: requests.received,
        send: requests.send.filter((user) => user.id !== requestId),
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-[95%] sm:w-[400px] border-none px-2 py-10 sm:p-12">
        <ReloadButton action={() => getData()} className="mx-auto flex items-center justify-center" />
        <Tabs defaultValue="received" className="w-full sm:w-[400px] mx-auto">
          <TabsList className="w-full h-auto">
            <TabsTrigger value="received" className="w-full py-2">
              Received
            </TabsTrigger>
            <TabsTrigger value="send" className="w-full py-2">
              Send
            </TabsTrigger>
          </TabsList>

          <TabsContent value="received">
            <section className="flex flex-col space-y-3 mt-5 min-h-[200px]">
              {requests.received?.map((user, index) => (
                <UserCard
                  user={user}
                  label="Accept"
                  action={() => acceptRequest(user.id, index)}
                />
              ))}

              {requests.received?.length == 0 && (
                <div className="w-full h-[200px] flex items-center justify-center">
                  <p>Empty Requests</p>
                </div>
              )}
            </section>
          </TabsContent>

          <TabsContent value="send">
            <section className="flex flex-col space-y-3 mt-5 min-h-[200px]">
              {requests.send?.map((user, index) => (
                <UserCard
                  user={user}
                  label="Cancel"
                  action={() => rejectRequest(user.id, index)}
                />
              ))}

              {requests.send?.length == 0 && (
                <div className="w-full h-[200px] flex items-center justify-center">
                  <p>Empty Requests</p>
                </div>
              )}
            </section>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default memo(Requests);
