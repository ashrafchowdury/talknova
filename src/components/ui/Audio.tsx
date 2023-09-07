"use client";
import { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import {
  PlayIcon,
  PauseIcon,
  StopIcon,
  TrashIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import { Button, useToast } from "@/packages/ui";
import { ReactMic } from "react-mic";
import { cn } from "@/lib/functions";
import { useUsers } from "@/provider";
import { Avatar } from ".";

export const AudioDemo = () => {
  const { audio } = useUsers();

  if (audio == null) return null;
  return (
    <div className="w-full my-4 float-left clear-both">
      <div className="w-auto flex flex-row-reverse items-end space-x-2 group/item relative">
        <Avatar
          img=""
          fallback="Me"
          className="w-4 md:w-6 h-4 md:h-6 text-[7px] md:text-[9px]"
        />
        <AudioMessage />
        <div className="absolute -bottom-[18px] right-10 flex items-center space-x-2">
          <div className=" right-1">
            <CheckIcon className="w-3 sm:w-4 h-3 sm:h-4" />
            <CheckIcon className="w-3 sm:w-4 h-3 sm:h-4 absolute top-0 left-[4px]" />
          </div>
          <p className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
            11:30PM
          </p>
        </div>
      </div>
    </div>
  );
};

export const AudioMessage = () => {
  const wavesurfer: any = useRef(null);
  const { audio, setAudio, isAudioPlaying, setIsAudioPlaying, isRecording } =
    useUsers();
  const wavesurferId = `wavesurfer--${Math.floor(
    Math.random() * 900000000000000
  )}`;

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: `#${wavesurferId}`,
      waveColor: "black",
      progressColor: "gray",
      height: 50,
      cursorWidth: 1,
      cursorColor: "black",
      barWidth: 2,
      normalize: true,
      fillParent: true,
    });
    wavesurfer.current.on("play", () => setIsAudioPlaying(true));
    wavesurfer.current.on("pause", () => setIsAudioPlaying(false));
  }, []);

  useEffect(() => {
    wavesurfer.current.load(audio.blobURL);
  }, [audio]);

  const togglePlayback = () => {
    if (!isAudioPlaying) {
      wavesurfer.current.play();
    } else {
      wavesurfer.current.pause();
    }
  };

  const stopPlayback = () => wavesurfer.current.stop();
  return (
    <section className="w-[300px] md:w-[380px] h-[60px] py-2 md:py-3 px-4 md:px-5 rounded-lg !mr-4 bg-slate-300 flex items-center justify-between">
      {!isAudioPlaying ? (
        <Button
          variant="ghost"
          size="icon"
          className="le hover:bg-transparent mr-2 inline-block"
          onClick={() => !isRecording && togglePlayback()}
        >
          <PlayIcon className="w-6 md:w-7 h-6 md:h-7 text-black" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="w-6 md:w-7 h-6 md:h-7 hover:bg-transparent mr-2"
          onClick={togglePlayback}
        >
          <PauseIcon className="w-6 md:w-7 h-6 md:h-7 text-black" />
        </Button>
      )}
      <div className="w-[295px]" id={wavesurferId}></div>
    </section>
  );
};

export const RecordAudio = () => {
  const [recordingTime, setRecordingTime] = useState(0);
  const {
    audio,
    setAudio,
    isAudioPlaying,
    setIsAudioPlaying,
    isRecording,
    setIsRecording,
  } = useUsers();
  const { toast } = useToast();

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval); // Clean up the interval on unmount
    };
  }, [isRecording]);

  const minutes = Math.floor(recordingTime / 60);
  const seconds = recordingTime % 60;

  const startRecording = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsAudioPlaying(false);
      setAudio(null);
      setIsRecording(true);
    } catch (error) {
      toast({ title: "Please enable your Mic first", variant: "destructive" });
    }
  };
  const stopRecording = async () => {
    setTimeout(() => {
      setIsRecording(false);
      setRecordingTime(0);
    }, 500);
  };
  const deleteRecording = () => {
    setAudio(null);
    stopRecording();
  };

  return (
    <>
      {!isRecording && (
        <Button
          title="Record Voice"
          size="icon"
          className="w-3 md:w-9 h-3 md:h-9"
          onClick={startRecording}
        >
          <svg
            width="14"
            height="20"
            viewBox="0 0 14 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 14.2857C8.11355 14.2845 9.18117 13.8326 9.96857 13.0292C10.756 12.2257 11.1988 11.1363 11.2 10V4.28571C11.2 3.14907 10.7575 2.05898 9.96985 1.25526C9.1822 0.451529 8.11391 0 7 0C5.88609 0 4.8178 0.451529 4.03015 1.25526C3.2425 2.05898 2.8 3.14907 2.8 4.28571V10C2.80116 11.1363 3.24403 12.2257 4.03143 13.0292C4.81883 13.8326 5.88645 14.2845 7 14.2857ZM4.2 4.28571C4.2 3.52795 4.495 2.80123 5.0201 2.26541C5.5452 1.72959 6.25739 1.42857 7 1.42857C7.74261 1.42857 8.4548 1.72959 8.9799 2.26541C9.505 2.80123 9.8 3.52795 9.8 4.28571V10C9.8 10.7578 9.505 11.4845 8.9799 12.0203C8.4548 12.5561 7.74261 12.8571 7 12.8571C6.25739 12.8571 5.5452 12.5561 5.0201 12.0203C4.495 11.4845 4.2 10.7578 4.2 10V4.28571ZM7.7 17.1071V19.2857C7.7 19.4752 7.62625 19.6568 7.49498 19.7908C7.3637 19.9247 7.18565 20 7 20C6.81435 20 6.6363 19.9247 6.50503 19.7908C6.37375 19.6568 6.3 19.4752 6.3 19.2857V17.1071C4.57419 16.9279 2.97479 16.1021 1.81111 14.7893C0.647431 13.4766 0.0021316 11.7701 0 10C0 9.81056 0.0737499 9.62888 0.205025 9.49492C0.336301 9.36097 0.514348 9.28571 0.7 9.28571C0.885652 9.28571 1.0637 9.36097 1.19497 9.49492C1.32625 9.62888 1.4 9.81056 1.4 10C1.4 11.5155 1.99 12.969 3.0402 14.0406C4.09041 15.1122 5.51479 15.7143 7 15.7143C8.48521 15.7143 9.90959 15.1122 10.9598 14.0406C12.01 12.969 12.6 11.5155 12.6 10C12.6 9.81056 12.6737 9.62888 12.805 9.49492C12.9363 9.36097 13.1143 9.28571 13.3 9.28571C13.4857 9.28571 13.6637 9.36097 13.795 9.49492C13.9263 9.62888 14 9.81056 14 10C13.9979 11.7701 13.3526 13.4766 12.1889 14.7893C11.0252 16.1021 9.42581 16.9279 7.7 17.1071Z"
              fill="white"
            />
          </svg>
        </Button>
      )}

      <section
        className={cn(
          "w-full h-[60px] hidden bg-black rounded-lg flex-row-reverse items-center justify-between space-x-3 pr-4 pl-1",
          isRecording && "flex"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="w-5 md:w-6 h-5 md:h-6 hover:bg-transparent mr-2"
          onClick={stopRecording}
        >
          <StopIcon className="w-5 md:w-6 h-5 md:h-6 text-white" />
        </Button>

        <ReactMic
          record={isRecording}
          className=" h-[50px] w-full"
          onStop={(file: any) => setAudio(file)}
          strokeColor="white"
          backgroundColor="black"
          mimeType="audio/webm"
          visualSetting="frequencyBars"
        />
        <p className="text-white text-sm whitespace-nowrap">{`${minutes}:${
          seconds < 10 ? 0 : ""
        }${seconds}`}</p>
        <Button
          variant="destructive"
          size="icon"
          className="w-8 md:w-9 h-7 md:h-8 mr-2"
          onClick={deleteRecording}
        >
          <TrashIcon className="w-4 md:w-5 h-4 md:h-5 text-white" />
        </Button>
      </section>
    </>
  );
};
