import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/packages/ui";
import { cn } from "@/lib/functions";

type ThemeSelectorType = {
  action: (e: any) => void;
  defaultValue: string;
  schema: any;
};

const ThemeSelector = ({ action, defaultValue, schema }: ThemeSelectorType) => {
  return (
    <Select onValueChange={action} defaultValue={defaultValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Themes</SelectLabel>
          {schema.map((item: any) => (
            <SelectItem
              value={item.value}
              key={item.title}
              className={cn(
                "my-2",
                item.title.includes("Default") && "border-t !mt-2 pt-2"
              )}
            >
              <div className="w-full flex items-center justify-between">
                <div
                  className={cn(
                    "w-3 h-3 rounded-sm mr-2",
                    item?.style ?? item?.value
                  )}
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
