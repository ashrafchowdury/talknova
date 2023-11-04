import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
} from "@/packages/ui";
import { Arrow } from "@radix-ui/react-popover";

type LinkPreviewType = {
  title: string;
  description: string;
  image: string;
  url: string;
};
const LinkPreview = ({ message }: { message: string }) => {
  const [preview, setPreview] = useState<LinkPreviewType>({
    title: "",
    description: "",
    image: "",
    url: "",
  });
  const [status, setStatus] = useState<"fetching" | "idl" | "error">("idl");
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const getLinkPreview = async () => {
    try {
      setStatus("fetching");
      const getData = await fetch(`https://api.linkpreview.net/?key=${
        process.env.NEXT_PUBLIC_LINK_PREVIEW_KEY
      }&q=${message.match(urlRegex)}
        `);
      const data = await getData.json();
      setPreview(data);
      setStatus("idl");
    } catch (error) {
      setStatus("error");
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild onClick={getLinkPreview}>
        <span className=" hover:underline duration-200 cursor-pointer">
          {message}
        </span>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={5}
        className="min-w-auto max-w-[85%] sm:max-w-[350px] md:max-w-[450px]"
      >
        {status == "fetching" && <LinkPreviewSkeleton />}
        {preview.title && (
          <a href={preview.url} target="_blank" rel="noopener noreferrer">
            <img
              src={preview.image}
              alt={preview.title}
              className="w-full h-[140px] md:h-[160px] rounded-lg object-cover"
            />
            <h3 className="text-[16px] md:text-lg font-semibold mt-2 mb-[2px] truncate">
              {preview.title}
            </h3>
            <p className="text-xs md:text-sm min-h-auto max-h-7 md:max-h-10 overflow-hidden mb-2">
              {preview.description}
            </p>
          </a>
        )}
        {status == "error" && (
          <p className="text-center my-7">Failed To Fetch {":("}</p>
        )}

        <Arrow />
      </PopoverContent>
    </Popover>
  );
};

export default LinkPreview;

export const LinkPreviewSkeleton = () => {
  return (
    <div className="w-full space-y-5">
      <Skeleton className="w-full h-24 rounded-lg" />
      <Skeleton className="w-full h-8 rounded-md" />
      <div className="w-full space-y-2">
        <Skeleton className="w-full h-4 rounded-sm" />
        <Skeleton className="w-full h-4 rounded-sm" />
      </div>
    </div>
  );
};
