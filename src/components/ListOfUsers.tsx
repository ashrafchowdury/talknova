import { Notification, Invite, Users } from "@/components/ui";
import {
  GearIcon,
  PlusCircledIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { Button, Input } from "@/packages/ui";
import Link from "next/link";

const ListOfUsers = () => {
  return (
    <aside className=" w-[95%] sm:w-[520px] md:w-[720px] lg:w-[300px] xl:w-[400px] h-[98vh] ml-5 mt-2 flex flex-col justify-between">
      <div>
        <nav className="h-[60px] flex items-center justify-between border-b">
          <h1 className=" text-2xl font-bold">Inbox</h1>
          <div>
            <Notification />
            <Invite>
              <Button
                variant="ghost"
                title="Invite Friends"
                className="py-[2px] px-2 mx-1 hover:bg-slate-200 duration-300"
              >
                <PlusCircledIcon className="w-5 h-5" />
              </Button>
            </Invite>
            <Button
              variant="ghost"
              title="Settings"
              className="py-[2px] px-2 mx-1 hover:bg-slate-200 duration-300"
              asChild
            >
              <Link href="/settings">
                <GearIcon className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </nav>

        <section className="w-full relative mt-4 mb-5 md:pr-[14px]">
          <Input placeholder="Search Friends" className="w-full py-5 px-9" />
          <MagnifyingGlassIcon className="w-5 h-5 absolute top-[11px] left-[10px]" />
        </section>

        <section className="w-full md:w-[98%] mt-8">
          <Users />
          <Users />
          <Users />
        </section>
      </div>

      <Invite>
        <Button className="w-full md:w-[97%]">
          <PlusCircledIcon className="w-5 h-5 mr-2" />
          Invite Friends
        </Button>
      </Invite>
    </aside>
  );
};

export default ListOfUsers;
