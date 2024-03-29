"use client";
import { useState, useEffect } from "react";
import { StopIcon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/packages/ui";
import dynamic from "next/dynamic";
import { ReactMicStopEvent } from "react-mic";
const DynamicReactMic = dynamic(
  () => import("react-mic").then((mod) => mod.ReactMic),
  {
    ssr: false,
  }
);
import { cn } from "@/lib/functions";
import { useChats } from "@/packages/server/context/ChatContext";
import { useTheme } from "next-themes";
import { useAppearance } from "@/lib/hooks";
import { toast } from "sonner";

const RecordAudio = () => {
  const [audio, setAudio] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isDelete, setIsDelete] = useState(false);
  const {
    isAudioPlaying,
    setIsAudioPlaying,
    isRecording,
    setIsRecording,
    uploadAudio,
    fileUploadProgress,
  } = useChats();
  const { theme } = useTheme();
  const { userAppearance } = useAppearance();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval); // Clean up the interval on unmount
    };
  }, [isRecording]);

  useEffect(() => {
    if (audio !== null && !isDelete) {
      uploadAudio(audio);
    } else {
      setAudio(null);
    }
  }, [audio]);

  const minutes = Math.floor(recordingTime / 60);
  const seconds = recordingTime % 60;

  const startRecording = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      isDelete && setIsDelete(false);
      setIsAudioPlaying(false);
      setIsRecording(true);
    } catch (error) {
      toast.warning("Please enable your Mic first");
    }
  };
  const stopRecording = async (isdelete: boolean) => {
    setIsDelete(isdelete);
    setTimeout(() => {
      setIsRecording(false);
      setRecordingTime(0);
    }, 500);
  };

  return (
    <>
      {!isRecording && (
        <Button
          load={fileUploadProgress > 0 ? true : false}
          title="Record Voice"
          size="icon"
          className={cn("w-8 md:w-9 h-8 md:h-9 bg-primary", userAppearance)}
          onClick={startRecording}
        >
          {fileUploadProgress == 0 && (
            <svg
              width="14"
              height="20"
              viewBox="0 0 14 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 sm:w-[14px] h-4 sm:h-5"
            >
              <path
                d="M7 14.2857C8.11355 14.2845 9.18117 13.8326 9.96857 13.0292C10.756 12.2257 11.1988 11.1363 11.2 10V4.28571C11.2 3.14907 10.7575 2.05898 9.96985 1.25526C9.1822 0.451529 8.11391 0 7 0C5.88609 0 4.8178 0.451529 4.03015 1.25526C3.2425 2.05898 2.8 3.14907 2.8 4.28571V10C2.80116 11.1363 3.24403 12.2257 4.03143 13.0292C4.81883 13.8326 5.88645 14.2845 7 14.2857ZM4.2 4.28571C4.2 3.52795 4.495 2.80123 5.0201 2.26541C5.5452 1.72959 6.25739 1.42857 7 1.42857C7.74261 1.42857 8.4548 1.72959 8.9799 2.26541C9.505 2.80123 9.8 3.52795 9.8 4.28571V10C9.8 10.7578 9.505 11.4845 8.9799 12.0203C8.4548 12.5561 7.74261 12.8571 7 12.8571C6.25739 12.8571 5.5452 12.5561 5.0201 12.0203C4.495 11.4845 4.2 10.7578 4.2 10V4.28571ZM7.7 17.1071V19.2857C7.7 19.4752 7.62625 19.6568 7.49498 19.7908C7.3637 19.9247 7.18565 20 7 20C6.81435 20 6.6363 19.9247 6.50503 19.7908C6.37375 19.6568 6.3 19.4752 6.3 19.2857V17.1071C4.57419 16.9279 2.97479 16.1021 1.81111 14.7893C0.647431 13.4766 0.0021316 11.7701 0 10C0 9.81056 0.0737499 9.62888 0.205025 9.49492C0.336301 9.36097 0.514348 9.28571 0.7 9.28571C0.885652 9.28571 1.0637 9.36097 1.19497 9.49492C1.32625 9.62888 1.4 9.81056 1.4 10C1.4 11.5155 1.99 12.969 3.0402 14.0406C4.09041 15.1122 5.51479 15.7143 7 15.7143C8.48521 15.7143 9.90959 15.1122 10.9598 14.0406C12.01 12.969 12.6 11.5155 12.6 10C12.6 9.81056 12.6737 9.62888 12.805 9.49492C12.9363 9.36097 13.1143 9.28571 13.3 9.28571C13.4857 9.28571 13.6637 9.36097 13.795 9.49492C13.9263 9.62888 14 9.81056 14 10C13.9979 11.7701 13.3526 13.4766 12.1889 14.7893C11.0252 16.1021 9.42581 16.9279 7.7 17.1071Z"
                fill={theme?.includes("light") ? "white" : "black"}
              />
            </svg>
          )}
        </Button>
      )}

      <section
        className={cn(
          "w-full h-[50px] md:h-[55px] hidden bg-primary rounded-lg flex-row-reverse items-center justify-between space-x-1 sm:space-x-2 md:space-x-3 pr-2 sm:pr-4 pl-1",
          isRecording && "flex",
          userAppearance
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="w-5 md:w-6 h-5 md:h-6 hover:bg-transparent mr-2"
          onClick={() => stopRecording(false)}
        >
          <StopIcon className="w-5 md:w-6 h-5 md:h-6 text-color" />
        </Button>

        <DynamicReactMic
          record={isRecording}
          className="h-[50px] w-[60%] sm:w-full"
          onStop={(file: ReactMicStopEvent) => setAudio(file.blob)}
          strokeColor={theme == "light" ? "white" : "black"}
          backgroundColor={"transparent"}
          mimeType="audio/webm"
          visualSetting="frequencyBars"
        />
        <p className="text-sm text-background whitespace-nowrap">{`${minutes}:${
          seconds < 10 ? 0 : ""
        }${seconds}`}</p>
        <Button
          variant="destructive"
          size="icon"
          className="w-7 md:w-9 h-7 md:h-8 mr-2"
          onClick={() => stopRecording(true)}
        >
          <TrashIcon className="w-4 md:w-5 h-4 md:h-5 text-white" />
        </Button>
      </section>
    </>
  );
};
export default RecordAudio;
