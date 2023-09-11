"use client";
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
  Skeleton,
} from "@/packages/ui";
import { BellIcon, TrashIcon, CheckIcon } from "@radix-ui/react-icons";
import { useUsers } from "@/provider";
import { Avatar } from "./ui";

const Notification = () => {
  const { getUserInvitations, invite, acceptUserInvite, myself } = useUsers();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          title="Notifications"
          className="py-[2px] px-2 mx-1 hover:bg-slate-200 duration-300"
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
              <NotificattionUsersSkeleton />
            ) : (
              <>
                {invite.map((data) => (
                  <>
                    <div
                      key={data.uid}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2 !mr-3 w-[70%]">
                        <Avatar
                          fallback={data.name}
                          className="w-9 md:w-10 h-9 md:h-10 text-xs md:text-sm"
                        />
                        <div className="overflow-hidden ">
                          <p className="text-sm md:text-[16px] font-semibold mb-1">
                            {data.name}
                          </p>
                          <p className="text-xs text-muted-foreground whitespace-nowrap">
                            {data.bio}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 md:space-x-2">
                        <Button
                          size="icon"
                          className="w-7 h-7 md:w-8 md:h-8"
                          onClick={() => acceptUserInvite(data.uid, data.id)}
                        >
                          <CheckIcon className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="w-7 h-7 md:w-8 md:h-8"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Separator className="mt-3 mb-4" />
                  </>
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

export const NotificattionUsersSkeleton = () => {
  const number_of_skeletons = [1, 2, 3, 4];
  return (
    <>
      {number_of_skeletons.map((item) => (
        <Skeleton
          className="w-full flex items-center justify-between p-2 md:p-3 rounded-lg my-2 md:my-3"
          key={item}
        >
          <div className="w-full flex items-center space-x-2">
            <Skeleton className="h-8 md:h-10 w-10 md:w-12 rounded-full" />
            <div className="w-full space-y-2">
              <Skeleton className="h-3 md:h-4 w-[60%] md:w-[120px]" />
              <Skeleton className="h-2 md:h-3 w-[75%] md:w-[160px]" />
            </div>
          </div>
          <div className="flex space-x-1">
            <Skeleton className="h-7 md:h-8 w-7 md:w-8 rounded-md" />
            <Skeleton className="h-7 md:h-8 w-7 md:w-8 rounded-md" />
          </div>
        </Skeleton>
      ))}
    </>
  );
};
