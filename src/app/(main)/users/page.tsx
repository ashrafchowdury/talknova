"use client";
import { ListOfUsers, Chat, UserSettings } from "@/components";
import { useUsers, useAuth } from "@/packages/server";
import { useTheme } from "next-themes";
import { Loader } from "@/components/ui";
import { useWindowResize } from "@/lib/hooks";

const Users = () => {
  const { windowSize } = useWindowResize();
  const { isLoading } = useUsers();
  const { theme } = useTheme();

  return (
    <main className="w-full flex justify-center">
      {windowSize == 0 || isLoading ? (
        <Loader
          variant={theme == "light" ? "black" : "white"}
          className="scale-150 md:scale-[2] absolute top-[50%] left-[50%] transform translate-x-[50%] translate-y-[50%]"
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
