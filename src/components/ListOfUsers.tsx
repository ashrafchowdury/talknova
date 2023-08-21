import { Notification, Invite, Users, Search } from "@/components/ui";
import { GearIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/packages/ui";

const ListOfUsers = () => {
  return (
    <aside className=" md:w-[720px] lg:w-[300px] xl:w-[400px] h-[98vh] ml-5 mt-2 flex flex-col justify-between">
      <div>
        <nav className="h-[60px] flex items-center justify-between border-b">
          <h1 className=" text-2xl font-bold">Inbox</h1>
          <div>
            <Search />
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
            >
              <GearIcon className="w-5 h-5" />
            </Button>
          </div>
        </nav>

        <section className="w-[98%] mt-8">
          <Users />
          <Users />
          <Users />
        </section>
      </div>

      <Invite>
        <Button className=" w-[98%]">
          <PlusCircledIcon className="w-5 h-5 mr-2" />
          Invite Friends
        </Button>
      </Invite>
    </aside>
  );
};

export default ListOfUsers;
