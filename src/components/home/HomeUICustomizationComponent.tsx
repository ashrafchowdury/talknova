import { Button, Popover, PopoverContent, PopoverTrigger } from "@/packages/ui";
import { themeSchema } from "@/lib/helpers";
import { cn } from "@/lib/functions";
import { useTheme } from "next-themes";
import { toggleTheme } from "@/lib/functions";
import { MoonIcon, SunIcon, CheckIcon } from "@radix-ui/react-icons";

const HomeUICustomizationComponent = () => {
  const { theme, setTheme } = useTheme();
  const changeColorScheme = (color: string) => {
    const which = theme?.split("-") as string[];
    setTheme(`${which[0]}-${color}`);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="text-xs md:text-sm" variant="outline">
          Customize UI
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] sm:w-[260px]" align="start">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Application UI</h4>
          <p className="text-sm text-muted-foreground">
            Customize the UI according to your preferrence.
          </p>
          <p className="text-sm text-muted-foreground !mt-5 !mb-3">UI Ccolor</p>
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

          <p className="text-sm text-muted-foreground !mt-5 !mb-3">Theme</p>
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
  );
};

export default HomeUICustomizationComponent;
