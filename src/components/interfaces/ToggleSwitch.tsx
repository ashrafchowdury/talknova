import { Switch, Badge } from "@/packages/ui";
import { cn } from "@/lib/functions";

type ToggleSwitchType = {
  title: string;
  desc: string;
  className?: string;
  badge?: string;
  checked?: boolean;
  action?: () => void;
};
const ToggleSwitch = ({
  title,
  desc,
  className,
  badge,
  checked,
  action,
}: ToggleSwitchType) => {
  return (
    <div
      className={cn("w-full flex items-center justify-between mb-7", className)}
    >
      <div className="mr-5">
        <p className="text-[16px] font-bold mb-1">
          {title}
          {badge && <Badge className="mb-1 ml-2 capitalize">{badge}</Badge>}
        </p>
        <p className="text-xs opacity-60">{desc}</p>
      </div>
      <Switch checked={checked ?? false} onClick={action} />
    </div>
  );
};

export default ToggleSwitch;
