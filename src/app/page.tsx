"use client";

import { useEffect } from "react";
import { Navbar, Register, Features } from "@/components";
import { MoonIcon, SunIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@/packages/ui";
import { useCookies } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { themeSchema } from "@/lib/helpers";
import { cn } from "@/lib/functions";
import { useTheme } from "next-themes";
import { toggleTheme } from "@/lib/functions";

export default function Home() {
  const { uid } = useCookies();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  useEffect(() => {
    if (uid) router.push("/users");
  }, []);

  const changeColorScheme = (color: string) => {
    const which: any = theme?.split("-");
    setTheme(`${which[0]}-${color}`);
  };
  return (
    <main className=" w-[95%] sm:w-[520px] md:w-[720px] lg:w-[1050px] xl:w-[1250px] mx-auto">
      <Navbar />

      <header className="w-full flex flex-col items-start justify-center mt-16 sm:mt-28">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
          Communication with end-2-end <br className="hidden sm:block" />{" "}
          encryption
        </h1>
        <p className="w-[95%] sm:w-[80%] lg:w-[60%] xl:w-[48%] text-sm sm:text-[16px] lg:text-lg xl:text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          quae ex corporis optio maiores assumenda commodi totam voluptates
          vitae mollitia!
        </p>
        <div className=" flex items-center space-x-3 mt-6 sm:mt-8">
          <Register />

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Customize UI</Button>
            </PopoverTrigger>
            <PopoverContent className="w-[220px] sm:w-[260px]" align="start">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Application UI</h4>
                <p className="text-sm text-muted-foreground">
                  Customize the UI according to your preferrence.
                </p>
                <p className="text-sm text-muted-foreground !mt-5 !mb-3">
                  UI Ccolor
                </p>
                <section className="flex flex-wrap items-center">
                  {themeSchema.map((item) => (
                    <button
                      key={item.title}
                      className={cn(
                        "rounded-full m-2 w-5 sm:w-6 h-5 sm:h-6 ring-2 ring-offset-2 ring-offset-background flex items-center justify-center",
                        item.style
                      )}
                      onClick={() => changeColorScheme(item.value)}
                    >
                      {theme?.split("-")[1] == item.value && (
                        <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      )}
                    </button>
                  ))}
                </section>

                <p className="text-sm text-muted-foreground !mt-5 !mb-3">
                  Theme
                </p>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => toggleTheme(theme, setTheme)}
                  >
                    <SunIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Light
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toggleTheme(theme, setTheme)}
                  >
                    <MoonIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Dark
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>
      <Features />
    </main>
  );
}
