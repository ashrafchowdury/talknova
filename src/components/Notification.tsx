"use client";

import { Fragment } from "react";
import {
  Button,
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  Separator,
} from "@/packages/ui";
import { BellIcon } from "@radix-ui/react-icons";
import { useUsers } from "@/packages/server/context/UserContext";
import { NotificationUsersSkeleton } from "./skeletons";
import { NotificationUsers } from ".";

const Notification = () => {
  const { invite, myself } = useUsers();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          title="Notifications"
          className="py-[2px] px-2 mx-1 hover:bg-border duration-300"
        >
          <BellIcon className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className=" flex flex-col justify-between overflow-y-auto p-3 md:p-6"
      >
        <aside>
          <SheetHeader>
            <SheetTitle>Notifications</SheetTitle>
            <SheetDescription>
              Make changes to your profile here.
            </SheetDescription>
          </SheetHeader>
          <section className="py-4 mt-3">
            {myself?.invite?.length > 0 && invite.length == 0 ? (
              <NotificationUsersSkeleton />
            ) : (
              <>
                {invite.map((data) => (
                  <Fragment key={data.uid}>
                    <NotificationUsers data={data} />
                    <Separator className="mt-3 mb-4" />
                  </Fragment>
                ))}
              </>
            )}
            {myself?.invite?.length == 0 && (
              <div className="flex flex-col space-y-3 items-center justify-center h-20">
                <p className="text-sm text-muted-foreground">No Notification</p>
              </div>
            )}
          </section>
        </aside>

        <SheetFooter className=" mt-8">
          <SheetClose className="flex items-center space-x-2 w-full">
            <Button variant="destructive" className="w-full">
              Reject All
            </Button>
            <Button className="w-full">Accept All</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default Notification;
