"use client";
import { MoonIcon, GitHubLogoIcon, SunIcon } from "@radix-ui/react-icons";
import { Button, Logo } from "@/packages/ui";
import Link from "next/link";
import Register from "./Register";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { setTheme, theme } = useTheme();
  return (
    <nav className="h-[80px] flex justify-between items-center">
      <div className="flex items-center">
        <Logo />
        <h1 className=" text-xl sm:text-2xl font-bold ml-1 sm:ml-2">
          TalkNova
        </h1>
      </div>

      <section className="navigation_links hidden md:flex">
        <Link href="/">Home</Link>
        <Link href="/">Features</Link>
        <Link href="/">About</Link>
      </section>

      <section className=" flex items-center space-x-1 sm:space-x-2">
        <a
          href="https://github.com/ashrafchowdury/talknova"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="ghost"
            className=" px-2 hover:bg-slate-200 dark:hover:bg-slate-800 duration-300"
          >
            <GitHubLogoIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </a>
        <Button
          variant="ghost"
          className=" px-2 hover:bg-slate-200 dark:hover:bg-slate-800 duration-300 mr-0 sm:!mr-3"
          onClick={() =>
            theme == "light" ? setTheme("dark") : setTheme("light")
          }
        >
          {theme == "light" ? (
            <MoonIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <SunIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </Button>

        <Register />
      </section>
    </nav>
  );
};

export default Navbar;
