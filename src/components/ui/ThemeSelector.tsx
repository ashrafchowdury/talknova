import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/packages/ui";

const ThemeSelector = () => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Colours</SelectLabel>
          <SelectItem value="apple">
            <div className="w-full flex items-center justify-between">
              <div className="w-3 h-3 rounded-sm bg-black mr-2"></div>
              Black
            </div>
          </SelectItem>
          <SelectItem value="banana">
            <div className="w-full flex items-center justify-between">
              <div className="w-3 h-3 rounded-sm bg-blue-500 mr-2"></div>
              Blue
            </div>
          </SelectItem>
          <SelectItem value="blueberry">
            <div className="w-full flex items-center justify-between">
              <div className="w-3 h-3 rounded-sm bg-red-500 mr-2"></div>
              Red Rose
            </div>
          </SelectItem>
          <SelectItem value="grapes">
            <div className="w-full flex items-center justify-between">
              <div className="w-3 h-3 rounded-sm bg-green-600 mr-2"></div>
              Green Leave
            </div>
          </SelectItem>
          <SelectItem value="pineapple">
            <div className="w-full flex items-center justify-between">
              <div className="w-3 h-3 rounded-sm bg-orange-500 mr-2"></div>
              Orange
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ThemeSelector;
