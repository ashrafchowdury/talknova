import { useState, useEffect } from "react";

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
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  useEffect(() => {
    const getLinkPreview = async () => {
      try {
        const getData = await fetch(`https://api.linkpreview.net/?key=${
          process.env.NEXT_PUBLIC_LINK_PREVIEW_KEY
        }&q=${message.match(urlRegex)}
        `);
        const data = await getData.json();
        setPreview(data);
      } catch (error) {
        console.log(error);
      }
    };
    getLinkPreview();
  }, []);

  return (
    <section className="w-full">
      <span>{message}</span>
      {preview.title && (
        <>
          <div className=" my-5"></div>
          <a
            href={preview.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <img
              src={preview.image}
              alt={preview.title}
              className=" w-full h-[140px] md:h-[160px] rounded-lg object-cover"
            />
            <h3 className=" text-[16px] md:text-lg font-semibold mt-2 mb-[2px]">
              {preview.title}
            </h3>
            <p className="text-xs md:text-sm mb-2">{preview.description}</p>
          </a>
        </>
      )}
    </section>
  );
};

export default LinkPreview;
