import { Switch } from "@/packages/ui";
import { cn } from "@/lib/functions";

type ToggleSwitchType = {
  title: string;
  desc: string;
  className?: string;
};
const ToggleSwitch = ({ title, desc, className }: ToggleSwitchType) => {
  return (
    <div
      className={cn("w-full flex items-center justify-between mb-7", className)}
    >
      <div className="mr-5">
        <p className="text-[16px] font-bold mb-1">{title}</p>
        <p className="text-xs opacity-60 -mt-1">{desc}</p>
      </div>
      <Switch checked={false} defaultChecked={false} />
    </div>
  );
};

export default ToggleSwitch;
