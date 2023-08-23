"use client";
import { ListOfUsers, Chat, UserSettings } from "@/components";
import { useUI } from "@/provider";
import { Loader } from "@/components/ui";

const Users = () => {
  const { windowSize } = useUI();
  return (
    <main className="w-full flex justify-center">
      {windowSize == 0 ? (
        <Loader
          variant="black"
          className=" scale-150 absolute top-[50%] left-[50%] transform translate-x-[50%] translate-y-[50%]"
        />
      ) : (
        <>
          <ListOfUsers />
          {windowSize > 1025 && <Chat className="lg:w-[600px] xl:w-[50%]" />}

          {windowSize > 1350 && <UserSettings className="w-[350px]" />}
        </>
      )}
    </main>
  );
};

export default Users;
