import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/packages/ui";
import { useUI, useUsers } from "@/provider";
import { themes } from "@/lib/helpers";
import { cn } from "@/lib/functions";
import { useTheme } from "next-themes";
import { useLS } from "@/lib/hooks";

const ThemeSelector = () => {
  const { userAppearance, setUserAppearance } = useUI();
  const { selectedUser } = useUsers();
  const { theme } = useTheme();
  const { setItem } = useLS();

  const handleChangeTheme = (e: any) => {
    setUserAppearance(e);
    setItem(selectedUser.uid, e);
  };
  return (
    <Select
      onValueChange={handleChangeTheme}
      defaultValue={
        userAppearance ?? theme == "light" ? themes[0].value : themes[1].value
      }
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Colours" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Colours</SelectLabel>
          {themes.map((item) => (
            <SelectItem value={item.value} key={item.title} className="my-2">
              <div className="w-full flex items-center justify-between">
                <div
                  className={cn("w-3 h-3 rounded-sm mr-2", item.value)}
                ></div>
                {item.title}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ThemeSelector;
