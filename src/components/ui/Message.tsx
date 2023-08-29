import Loader from "./Loader";

import { cn } from "@/lib/functions";
import { useUI } from "@/provider";
import { ClipboardCopyIcon, TrashIcon } from "@radix-ui/react-icons";

const Message = () => {
  const { userAppearance } = useUI();
  return (
    <>
      <div
        className={cn(
          "py-3 px-5 text-sm md:text-[16px] rounded-lg w-auto text-white my-2 md:my-3 relative"
        )}
        style={{ backgroundColor: userAppearance }}
      >
        <span>Lorem ipsum dolor sit. ipsum dolor sit.</span>
      </div>

      <div
        className="h-[34px] md:h-10 w-16 rounded-lg bg-black text-white my-2 md:my-3 flex items-center justify-center"
        style={{ backgroundColor: userAppearance }}
      >
        <Loader variant="white" />
      </div>
    </>
  );
};

export default Message;
