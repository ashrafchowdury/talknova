import { Avatar, AvatarFallback, AvatarImage } from "@/packages/ui";
import { cn } from "@/lib/functions";

const AvatarImg = ({ img, fallback, className }: any) => {
  return (
    <Avatar className={cn("w-24 h-24", className)}>
      <AvatarImage src={img} alt={fallback} />
      <AvatarFallback className=" font-bold w-full h-full bg-slate-300 uppercase">
        {fallback?.slice(0, 2)}
      </AvatarFallback>
    </Avatar>
  );
};

export default AvatarImg;
