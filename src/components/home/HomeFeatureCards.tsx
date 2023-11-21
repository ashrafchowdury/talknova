"use client";

import {
  PlayIcon,
  TrashIcon,
  StopIcon,
  LockClosedIcon,
  LockOpen1Icon,
  ArrowLeftIcon,
  GearIcon,
  Cross1Icon,
  CheckIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/functions";
import { Avatar, Loader } from "..";
import { Button } from "@/packages/ui";
import { useTheme } from "next-themes";
import Image from "next/image";

export const TextMessageFeature = () => {
  const { theme } = useTheme();
  return (
    <section className="group/item w-[90%] sm:w-[255px] md:w-[325px] xl:w-[298px] h-[310px] sm:h-[310px] md:h-[350px] xl:h-[340px] flex flex-col items-center rounded-lg py-7 px-5 md:px-8 relative border border-dashed overflow-hidden my-2 sm:m-2 lg:m-3 xl:m-2">
      <div className="w-full h-[150px] absolute top-0 left-0 right-0 bg-gradient-to-b from-muted to-backgound -z-20"></div>
      <div className="w-full mt-5 h-[200px]">
        {[54, 80, 43, 20, 25].map((item, index) => {
          const sum = index % 2 !== 0;
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
                  sum && "flex-row-reverse",
                  item == 25 &&
                    "invisible group-hover/item:visible -translate-x-3 group-hover/item:translate-x-0 duration-300"
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
                    "h-6 rounded-md bg-border flex items-center justify-center",
                    sum ? "!mr-1" : "bg-primary"
                  )}
                  style={{ width: `${item}%` }}
                >
                  {item == 25 && (
                    <Loader
                      variant={theme?.includes("light") ? "white" : "black"}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-base md:text-lgmibold mb-1">Text Message</p>
      <p className="text-xs md:text-sm text-foreground opacity-90">
        Lorem ipsum dolor sit amet.
      </p>
    </section>
  );
};

export const ShareImageFeature = () => {
  return (
    <section className="group/item w-[90%] sm:w-[255px] md:w-[325px] xl:w-[298px] h-[310px] sm:h-[310px] md:h-[350px] xl:h-[340px] flex flex-col items-center rounded-lg py-7 px-1 relative border border-dashed overflow-hidden my-2 sm:m-2 lg:m-3 xl:m-2">
      <div className="w-full h-[150px] absolute top-0 left-0 right-0 bg-gradient-to-b from-muted to-backgound -z-20"></div>
      <div className="w-full mt-7 md:mt-5 h-[200px] flex justify-center overflow-hidden relative">
        <div className="w-[120px] md:w-[140px] h-[140px] md:h-[160px] bg-muted rounded-lg flex items-center justify-center scale-75 absolute -z-10 left-8 sm:left-5 group-hover/item:left-2 sm:group-hover/item:-left-2 duration-300">
          <Image
            src="https://images.unsplash.com/photo-1698430185962-cbbdc7797f5a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image"
            width={120}
            height={150}
            className="rounded-lg w-[100px] md:!w-[120px] h-[120px] md:h-[140px] object-cover"
            loading="lazy"
          />
        </div>
        <div className="w-[130px] md:w-[150px] h-[130px] md:h-[160px] bg-primary rounded-lg flex items-center justify-center group-hover/item:scale-90 duration-300">
          <Image
            src="https://images.unsplash.com/photo-1552234994-66ba234fd567?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image"
            width={130}
            height={150}
            className="rounded-lg w-[110px] md:!w-[130px] h-[110px] md:h-[140px] object-cover"
            loading="lazy"
          />
        </div>
        <div className="w-[120px] md:w-[140px] h-[140px] md:h-[160px] bg-muted rounded-lg flex items-center justify-center scale-75 absolute -z-10 right-8 sm:right-5 group-hover/item:right-2 sm:group-hover/item:-right-2 duration-300">
          <Image
            src="https://images.unsplash.com/photo-1699871128680-70d26ce4d3d8?q=80&w=2052&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image"
            width={120}
            height={150}
            className="rounded-lg w-[100px] md:!w-[120px] h-[120px] md:h-[140px] object-cover"
            loading="lazy"
          />
        </div>
      </div>
      <p className="text-base md:text-lg font-semibold mb-1">Share Images</p>
      <p className="text-xs md:text-sm text-foreground opacity-90">
        Lorem ipsum dolor sit amet.
      </p>
    </section>
  );
};

export const AudioMessageFeature = () => {
  const buffer = [
    10, 8, 2, 5, 15, 7, 1, 3, 8, 2, 9, 1, 12, 18, 1, 16, 17, 6, 8, 13, 12, 3, 1,
    1, 1, 1,
  ];
  return (
    <section className="group/item w-[90%] sm:w-[255px] md:w-[325px] xl:w-[298px] h-[310px] sm:h-[310px] md:h-[350px] xl:h-[340px] flex flex-col items-center rounded-lg py-7 px-5 md:px-8 relative border border-dashed overflow-hidden my-2 sm:m-2 lg:m-3 xl:m-2">
      <div className="w-full h-[150px] absolute top-0 left-0 right-0 bg-gradient-to-b from-muted to-backgound -z-20"></div>
      <div className="w-full mt-2 mb-3 h-[200px]">
        <div className="w-full flex items-end space-x-2 mb-5">
          <div className="w-full h-10 rounded-md bg-border flex items-center justify-between px-4">
            <PlayIcon className="w-5 h-5" />
            <div className="ml-2 w-full h-[6px] bg-primary rounded-sm"></div>
          </div>
          <Avatar
            className="w-4 h-4 rounded-full bg-border text-[7px]"
            fallback="Ashraf"
            img={process.env.NEXT_PUBLIC_USER_IMAGE_ONE}
          />
        </div>

        <div className="w-full flex items-end space-x-1 my-5">
          <Avatar
            className="w-4 h-4 rounded-full bg-border text-[7px]"
            fallback="Chowdury"
            img={process.env.NEXT_PUBLIC_USER_IMAGE_TWO}
          />
          <div className="w-full h-10 rounded-md bg-border flex flex-row-reverse items-center justify-between px-4">
            <PlayIcon className="w-5 h-5" />
            <div className="mr-2 w-full h-[6px] bg-primary rounded-sm"></div>
          </div>
        </div>

        <div className="w-full h-[45px] rounded-md bg-muted flex items-center justify-between mt-9 md:mt-12 px-2 md:px-3">
          <div className="w-9 h-7 rounded-md bg-destructive flex items-center justify-center">
            <TrashIcon className="w-4 h-4 text-white" />
          </div>

          <div className="mx-4 w-[90%] flex flex-row-reverse items-end space-x-[2px] overflow-hidden">
            {buffer.map((item, index) => {
              return (
                <div
                  className="w-[4px] bg-primary group-hover/item:animate-bounce duration-100"
                  style={{ height: `${item}px` }}
                  key={index}
                ></div>
              );
            })}
          </div>
          <StopIcon className="w-6 h-6" />
        </div>
      </div>
      <p className="text-base md:text-lg font-semibold mb-1">Voice Message</p>
      <p className="text-xs md:text-sm text-foreground opacity-90">
        Lorem ipsum dolor sit amet.
      </p>
    </section>
  );
};

export const LockChatFeature = () => {
  return (
    <section className="group/item w-[90%] sm:w-[255px] md:w-[325px] xl:w-[298px] h-[310px] sm:h-[310px] md:h-[350px] xl:h-[340px] flex flex-col items-center rounded-lg py-7 px-5 md:px-8 relative border border-dashed overflow-hidden my-2 sm:m-2 lg:m-3 xl:m-2">
      <div className="w-full h-[150px] absolute top-0 left-0 right-0 bg-gradient-to-b from-muted to-backgound -z-20"></div>
      <div className="w-[70%] sm:w-[170px] md:w-[200px] h-10 opacity-50 rounded-lg border border-dashed border-primary absolute -top-4 group-hover/item:-top-2 duration-300"></div>
      <div className="w-[30px] md:w-[40px] h-20 opacity-50 rounded-lg border border-dashed border-primary absolute -top-3 -left-3 group-hover/item:-top-5 duration-300"></div>
      <div className="w-[30px] md:w-[40px] h-20 opacity-50 rounded-lg border border-dashed border-primary absolute -top-3 -right-3 group-hover/item:-top-5 duration-300"></div>
      <div className="w-[30px] md:w-[40px] h-32 md:h-36 opacity-50 rounded-lg border border-dashed border-primary absolute top-24 -left-3 group-hover/item:top-20 duration-300"></div>
      <div className="w-[30px] md:w-[40px] h-32 md:h-36 opacity-50 rounded-lg border border-dashed border-primary absolute top-24 -right-3 group-hover/item:top-20 duration-300"></div>

      <div className="w-full mt-5 h-[200px] flex justify-center group-hover/item:mt-8 duration-300">
        <div className="w-[160px] sm:w-[180px] md:w-[200px] h-[150px] md:h-[170px] rounded-lg border overflow-hidden relative">
          <div className="w-full h-10 bg-border flex items-center justify-between px-2">
            <div className="w-5 md:w-6 h-5 md:h-6 rounded-md bg-background flex items-center justify-center">
              <ArrowLeftIcon className="w-3 h-3" />
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-5 md:w-6 h-5 md:h-6 rounded-full bg-background flex items-center justify-center uppercase text-[8px] font-bold">
                AS
              </div>
              <div className="w-16 md:w-20 h-4 md:h-5 rounded-md bg-background"></div>
            </div>
            <div className="w-5 md:w-6 h-5 md:h-6 rounded-md bg-background flex items-center justify-center">
              <GearIcon className="w-3 h-3" />
            </div>
          </div>

          <LockClosedIcon className="w-10 md:w-14 h-10 md:h-14 group-hover/item:scale-105 duration-300 absolute top-[60%] left-[50%] transform -translate-y-[50%] -translate-x-[50%] group-hover/item:hidden" />
          <LockOpen1Icon className="w-10 md:w-14 h-10 md:h-14 group-hover/item:scale-105 duration-300 absolute top-[60%] left-[50%] transform -translate-y-[50%] -translate-x-[50%] hidden group-hover/item:block" />
        </div>
      </div>
      <p className="text-base md:text-lg font-semibold mb-1">Lock Chat</p>
      <p className="text-xs md:text-sm text-foreground opacity-90">
        Lock each chat with pass.
      </p>
    </section>
  );
};

export const EncryptionFeature = () => {
  return (
    <section className="group/item w-[90%] sm:w-[255px] md:w-[325px] xl:w-[298px] h-[310px] sm:h-[310px] md:h-[350px] xl:h-[340px] flex flex-col items-center rounded-lg py-7 px-5 md:px-8 relative border border-dashed overflow-hidden my-2 sm:m-2 lg:m-3 xl:m-2">
      <div className="w-full h-[150px] absolute top-0 left-0 right-0 bg-gradient-to-b from-muted to-backgound -z-20 group-hover/item:h-[350px] duration-300"></div>
      <div className="border border-dashed border-muted absolute top-0 bottom-0 left-20 -z-10 group-hover/item:left-24 duration-300"></div>
      <div className="border border-dashed border-muted absolute top-0 bottom-0 right-16 -z-10 group-hover/item:right-20 duration-300"></div>
      <div className="border border-dashed border-muted absolute left-0 right-0 top-20 -z-10 group-hover/item:top-28 duration-300"></div>
      <div className="border border-dashed border-muted absolute left-0 right-0 bottom-[124px] -z-10 group-hover/item:bottom-[152px] duration-300"></div>

      <div className="w-full mt-2 mb-3 h-[200px] md:p-2 flex items-center justify-center group-hover/item:scale-105 duration-300">
        <div className="w-full flex items-end space-x-1 mt-4">
          <Avatar
            className="w-4 h-4 rounded-full bg-border text-[7px]"
            fallback="Ashraf"
            img={process.env.NEXT_PUBLIC_USER_IMAGE_ONE}
          />
          <div className="h-20 sm:h-24 w-full rounded-r-md rounded-t-md bg-primary px-3 py-2 break-all text-color">
            <p className="text-xs sm:text-sm font-semibold group-hover/item:hidden duration-300">
              U2FsdGVkX1+TN4/a8s0aLlnxPk5ebtxP5yshblVjIgbcDA580pOQBDZ4SFXqi3h+iYevyXNl1bE32lVr
            </p>
            <p className="text-xs sm:text-sm font-semibold hidden group-hover/item:block duration-300 text-color">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae
              adipisicing elit.
            </p>
          </div>
        </div>
      </div>

      <p className="text-base md:text-lg font-semibold mb-1">Encryption</p>
      <p className="text-xs md:text-sm text-foreground opacity-90">
        Lorem ipsum dolor sit amet.
      </p>
    </section>
  );
};

export const CustomizeUIFeature = () => {
  const color = [
    { id: 54, style: "bg-white border text-black", title: "Black & White" },
    { id: 45, style: "bg-blue-600", title: "Row Blue" },
    { id: 72, style: "bg-rose-600", title: "Red Rose" },
    { id: 55, style: "bg-green-600", title: "Green Leave" },
    { id: 30, style: "bg-orange-600", title: "Orange" },
  ];
  return (
    <section className="group/item w-[90%] sm:w-[255px] md:w-[325px] xl:w-[298px] h-[310px] sm:h-[310px] md:h-[350px] xl:h-[340px] flex flex-col items-center rounded-lg py-7 px-8 relative border border-dashed overflow-hidden my-2 sm:m-2 lg:m-3 xl:m-2">
      <div className="w-full h-[150px] absolute top-0 left-0 right-0 bg-gradient-to-b from-muted to-backgound -z-20"></div>

      <div className="w-full mb-5 md:mb-0 md:mt-5 h-[200px]">
        {color.map((item, index) => {
          const sum = index % 3 !== 0;
          return (
            <div
              className={cn(
                "w-full my-[6px] rounded-sm",
                sum ? "float-right clear-both" : "float-left clear-both"
              )}
              key={item.id}
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
                />

                <div
                  className={cn(
                    "h-6 rounded-md group-hover/item:!w-[82%] duration-300 flex items-center justify-center text-color",
                    sum && "!mr-1",
                    item.style
                  )}
                  style={{ width: `${item.id}%` }}
                >
                  <span className="text-sm font-bold invisible group-hover/item:visible duration-300 text-center">
                    {item.title}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-base md:text-lg font-semibold mb-1">Customize UI</p>
      <p className="text-xs md:text-sm text-foreground opacity-90">
        Lorem ipsum dolor sit amet.
      </p>
    </section>
  );
};

export const ConnectFeature = () => {
  return (
    <section className="group/item w-[90%] sm:w-[255px] md:w-[325px] xl:w-[298px] h-[310px] sm:h-[310px] md:h-[350px] xl:h-[340px] flex flex-col items-center rounded-lg py-7 px-3 md:px-8 relative border border-dashed overflow-hidden my-2 sm:m-2 lg:m-3 xl:m-2">
      <div className="w-full h-[150px] absolute top-0 left-0 right-0 bg-gradient-to-b from-muted to-backgound -z-20"></div>

      <div className="w-full mt-5 h-[200px] flex flex-col items-center relative">
        <div className="w-full h-[48px] md:h-[52px] p-[6px] md:p-2 border border-dashed border-foreground flex items-center justify-between rounded-lg mt-12 group-hover/item:mt-0 duration-300 delay-500">
          <div className="w-full flex items-center space-x-2">
            <Avatar
              fallback="Ashraf"
              img={process.env.NEXT_PUBLIC_USER_IMAGE_TWO}
              className="w-6 md:w-7 h-6 md:h-7 text-[10px]"
            />
            <p className="text-sm md:text-base overflow-hidden">
              Ashraf Chowdury
            </p>
          </div>
          <Button
            className="text-xs h-7 w-12 group-hover/item:!bg-primary group-hover/item:text-color"
            variant="secondary"
          >
            Send
          </Button>
        </div>

        <div className="w-[98%] md:w-[270px] h-[46px] md:h-[50px] py-2 px-2 md:px-3 bg-muted flex items-center justify-between rounded-lg absolute top-12 z-10 invisible group-hover/item:visible group-hover/item:top-16 duration-300 delay-500">
          <div className="w-full flex items-center space-x-2">
            <Avatar
              fallback="Ashraf"
              img={process.env.NEXT_PUBLIC_USER_IMAGE_TWO}
              className="w-6 md:w-7 h-6 md:h-7 text-[10px]"
            />
            <p className="text-sm md:text-base">Ashraf Chowdury</p>
          </div>
          <Button className="h-6 md:h-7 w-8 md:w-9 mr-1 md:mr-2" size="icon">
            <CheckIcon className="w-4 h-4" />
          </Button>
          <Button
            className="h-6 md:h-7 w-8 md:w-9 mr-1 md:mr-2"
            size="icon"
            variant="destructive"
          >
            <Cross1Icon className="w-4 h-4" />
          </Button>
        </div>
        <div className="w-[98%] md:w-[270px] h-[46px] md:h-[50px] py-2 px-2 md:px-3 bg-muted flex items-center justify-between rounded-lg absolute top-12 z-10 invisible group-hover/item:visible group-hover/item:top-[120px] duration-300 delay-500">
          <div className="w-full flex items-center space-x-2">
            <Avatar
              fallback="Ashraf"
              img={process.env.NEXT_PUBLIC_USER_IMAGE_ONE}
              className="w-6 md:w-7 h-6 md:h-7 text-[10px]"
            />
            <p className="text-sm md:text-base">Mohammed</p>
          </div>
          <Button className="h-6 md:h-7 w-8 md:w-9 mr-1 md:mr-2" size="icon">
            <CheckIcon className="w-4 h-4" />
          </Button>
          <Button
            className="h-6 md:h-7 w-8 md:w-9 mr-1 md:mr-2"
            size="icon"
            variant="destructive"
          >
            <Cross1Icon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <p className="text-base md:text-lg font-semibold mb-1">
        Connect With Others
      </p>
      <p className="text-xs md:text-sm text-foreground opacity-90">
        Lorem ipsum dolor sit amet.
      </p>
    </section>
  );
};

export const AllOtherFeatures = () => {
  const otherfeatures = [
    "User Status",
    "Typing Effect",
    "Seen/Unseen",
    "Link Preview",
    "User Align",
    "Sound Effect",
    "Image Download",
    "Compress Image",
  ];
  return (
    <section className="group/item w-[90%] sm:w-[255px] md:w-[325px] xl:w-[298px] h-[310px] sm:h-[310px] md:h-[350px] xl:h-[340px] flex flex-col items-center rounded-lg py-7 px-2 relative border border-dashed overflow-hidden my-2 sm:m-2 lg:m-3 xl:m-2">
      <div className="w-full h-[150px] absolute top-0 left-0 right-0 bg-gradient-to-b from-muted to-backgound -z-20"></div>

      <div className="w-full mb-5 md:mb-0 md:mt-5 h-[200px]">
        <div className="flex flex-wrap justify-center items-center mt-3 md:mt-5">
          {otherfeatures.map((item) => (
            <div
              key={item}
              className="h-8 m-1 rounded-md px-1 group-hover/item:px-2 border border-dashed border-foreground text-xs flex items-center bg-muted group-hover/item:bg-transparent duration-300"
            >
              <span className="invisible group-hover/item:visible duration-300">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-base md:text-lg font-semibold mb-1">All Others</p>
      <p className="text-xs md:text-sm text-foreground opacity-90">
        Lorem ipsum dolor sit amet.
      </p>
    </section>
  );
};
