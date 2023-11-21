import {
  ArrowLeftIcon,
  GearIcon,
  PaperPlaneIcon,
  ImageIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/functions";
import { Avatar } from "..";

const HomeHeaderImage = () => {
  return (
    <div className="w-[90%] sm:w-[420px] md:-w-[520px] lg:w-[620px] h-[300px] relative border rounded-lg overflow-hidden">
      <div className="w-full h-10 bg-border flex items-center justify-between px-5">
        <div className="w-6 h-6 rounded-md bg-background flex items-center justify-center">
          <ArrowLeftIcon className="w-3 h-3" />
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-6 h-6 rounded-full bg-background flex items-center justify-center uppercase text-[8px] font-bold">
            AS
          </div>
          <div className="w-20 h-5 rounded-md bg-background"></div>
        </div>
        <div className="w-6 h-6 rounded-md bg-background flex items-center justify-center">
          <GearIcon className="w-3 h-3" />
        </div>
      </div>
      <div className="w-full px-5 mt-4">
        {[54, 80, 43, 60, 30].map((item, index) => {
          const sum = index % 3 !== 0;
          return (
            <div
              className={cn(
                "w-full my-[6px] rounded-sm",
                sum ? "float-right clear-both" : "float-left clear-both"
              )}
              key={item}
            >
              <div
                className={cn(
                  "w-full flex items-end space-x-1",
                  sum && "flex-row-reverse"
                )}
              >
                <Avatar
                  className="w-4 h-4 rounded-full bg-border text-[7px]"
                  fallback={sum ? "Ashraf" : "Chowdury"}
                  img={
                    sum
                      ? process.env.NEXT_PUBLIC_USER_IMAGE_ONE
                      : process.env.NEXT_PUBLIC_USER_IMAGE_TWO
                  }
                />

                <div
                  className={cn(
                    "h-6 rounded-md bg-border",
                    sum ? "!mr-1" : "bg-primary"
                  )}
                  style={{ width: `${item}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full bg-background absolute bottom-[10px] px-5">
        <div className="w-full h-9 relative border rounded-md flex items-center justify-between px-3">
          <span className="text-[10px] text-foreground">Write Message</span>
          <div className="flex items-center space-x-3 -mr-1">
            <PlusIcon className="w-[14px] h-[14px]" />
            <ImageIcon className="w-[14px] h-[14px]" />
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <PaperPlaneIcon className="w-3 h-3 text-color" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeaderImage;
