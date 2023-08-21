import { Switch } from "@/packages/ui";

type ToggleSwitchType = {
  title: string;
  desc: string;
};
const ToggleSwitch = ({ title, desc }: ToggleSwitchType) => {
  return (
    <div className="w-full flex items-center justify-between mb-7">
      <div className="mr-5">
        <p className="text-[16px] font-bold mb-1">{title}</p>
        <p className="text-xs opacity-60 -mt-1">{desc}</p>
      </div>
      <Switch />
    </div>
  );
};

export default ToggleSwitch;
