import { cn } from "@/lib/functions";

type VariantType = {
  variant: "black" | "white";
  className?: string;
};
const Loader = ({ variant, className }: VariantType) => {
  return (
    <div
      className={cn(variant == "black" ? "loader_dark" : "loader", className)}
    ></div>
  );
};

export default Loader;
