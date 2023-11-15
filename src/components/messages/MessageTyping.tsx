import { useUsers } from "@/packages/server/context/UserContext";
import { UserType } from "@/packages/server";
import { Loader, Avatar } from "@/components";
import { useAppearance } from "@/lib/hooks";
import { cn } from "@/lib/functions";
import { useTheme } from "next-themes";

const MessageTyping = ({ user }: { user: UserType }) => {
  const { myself } = useUsers();
  const { userAppearance } = useAppearance();
  const { theme } = useTheme();

  if (user?.typing?.istyping && myself.uid !== user?.typing?.user) {
    return (
      <div className="w-full my-5 float-left clear-both">
        <div className="w-auto flex items-end space-x-2">
          <Avatar
            img={user?.image}
            fallback={user?.name}
            className="w-4 md:w-6 h-4 md:h-6 text-[7px] md:text-[9px]"
          />
          <div
            className={cn(
              "h-[34px] md:h-10 w-16 md:w-24 rounded-lg bg-primary flex items-center justify-center opacity-80",
              userAppearance && userAppearance
            )}
          >
            <Loader
              variant={theme == "dark-black" ? "black" : "white"}
              className="scale-105"
            />
          </div>
        </div>
      </div>
    );
  }
};

export default MessageTyping;
