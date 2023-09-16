import { Avatar as Continer, AvatarFallback, AvatarImage } from "@/packages/ui";
import { cn } from "@/lib/functions";

type AvatarType = {
  img?: string;
  fallback: string;
  className?: string;
};

const Avatar = ({ img, fallback, className }: AvatarType) => {
  return (
    <Continer className={cn("w-24 h-24", className)}>
      <AvatarImage src={img} alt={fallback} />
      <AvatarFallback className=" font-bold w-full h-full bg-slate-300 dark:bg-slate-800 uppercase">
        {fallback?.slice(0, 2)}
      </AvatarFallback>
    </Continer>
  );
};

export default Avatar;
