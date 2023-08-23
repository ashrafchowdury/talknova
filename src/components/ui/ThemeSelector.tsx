import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/packages/ui";
import { useUI } from "@/provider";

const ThemeSelector = () => {
  const { userAppearance, setUserAppearance } = useUI();
  return (
    <Select
      onValueChange={(e) => setUserAppearance(e)}
      defaultValue={userAppearance}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Colours" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Colours</SelectLabel>
          <SelectItem value="black">
            <div className="w-full flex items-center justify-between">
              <div className="w-3 h-3 rounded-sm bg-black mr-2"></div>
              Black
            </div>
          </SelectItem>
          <SelectItem value="blue">
            <div className="w-full flex items-center justify-between">
              <div className="w-3 h-3 rounded-sm bg-blue-500 mr-2"></div>
              Blue
            </div>
          </SelectItem>
          <SelectItem value="red">
            <div className="w-full flex items-center justify-between">
              <div className="w-3 h-3 rounded-sm bg-red-500 mr-2"></div>
              Red Rose
            </div>
          </SelectItem>
          <SelectItem value="green">
            <div className="w-full flex items-center justify-between">
              <div className="w-3 h-3 rounded-sm bg-green-600 mr-2"></div>
              Green Leave
            </div>
          </SelectItem>
          <SelectItem value="orange">
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
