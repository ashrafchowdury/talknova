"use client";

import { useState, MutableRefObject } from "react";
import { saveAs } from "file-saver";
import { useToast } from "@/packages/ui";

const useDownload = () => {
  const [isDownload, setIsDownload] = useState(false);
  const { toast } = useToast();

  const downloadImg = async (
    fileRef: MutableRefObject<HTMLImageElement>,
    type: "single" | "multiple"
  ) => {
    try {
      setIsDownload(true);
      await new Promise((resolve) => setTimeout(() => resolve(""), 1000));
      if (type == "single") {
        saveAs(fileRef.current.src, `talknova.png`);
      } else {
        const allImages = fileRef.current.querySelectorAll("img");
        allImages.forEach((item) => {
          saveAs(item.src, `talknova.png`);
        });
      }
      setIsDownload(false);
    } catch (error) {
      toast({ title: "Someting Went Wrong!", variant: "destructive" });
    }
  };

  const downloadAudio = async (fileRef: MutableRefObject<HTMLAudioElement>) => {
    const audioUrl = (
      fileRef.current.querySelector("audio") as HTMLAudioElement
    ).src;
    try {
      setIsDownload(true);
      await new Promise((resolve) => setTimeout(() => resolve(""), 1000));
      saveAs(audioUrl, `talknova.webm`);
      setIsDownload(false);
    } catch (error) {
      toast({ title: "Someting Went Wrong!", variant: "destructive" });
    }
  };

  return { downloadImg, downloadAudio, isDownload };
};

export default useDownload;
