import {
  useState,
  useEffect,
  useRef,
  MutableRefObject,
  MouseEvent,
} from "react";
import { PlayIcon, PauseIcon } from "@radix-ui/react-icons";
import { Button } from "@/packages/ui";
import { cn } from "@/lib/functions";
import { useChats } from "@/packages/server/context/ChatContext";
import { useAppearance } from "@/lib/hooks";

type MessageAudioType = {
  data: string;
  position: boolean;
  fileRef: MutableRefObject<HTMLAudioElement>;
};

const MessageAudio = ({ data, position, fileRef }: MessageAudioType) => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { setIsAudioPlaying, isRecording } = useChats();
  const { userAppearance } = useAppearance();
  const audioRef: MutableRefObject<HTMLAudioElement> = useRef(null!);

  // Update current time as audio plays
  useEffect(() => {
    const audioElement = audioRef.current;
    const updateCurrentTime = () => {
      setCurrentTime(audioElement.currentTime);
      setDuration(audioRef.current.duration);
      if (audioElement.ended) {
        setAudioPlaying(false); // Set isPlaying to false when audio finishes
        setCurrentTime(0);
      }
    };
    audioElement.addEventListener("timeupdate", updateCurrentTime);
    return () => {
      audioElement.removeEventListener("timeupdate", updateCurrentTime);
    };
  }, []);

  const togglePlayback = () => {
    if (audioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setAudioPlaying(!audioPlaying);
    setDuration(audioRef.current.duration);
    setIsAudioPlaying(!audioPlaying);
  };

  // Update audio playback time when progress bar is clicked
  const handleProgressBarClick = (e: MouseEvent<HTMLDivElement>) => {
    try {
      if (duration === 0) return; // Avoid division by zero
      const clickedTime =
        (e.nativeEvent.offsetX / (e.target as HTMLDivElement).offsetWidth) *
        duration;
      audioRef.current.currentTime = clickedTime;
      setCurrentTime(clickedTime);
      setAudioPlaying(true);
      audioRef.current.play();
    } catch (error) {
      console.log(error);
    }
  };

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const time = `${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
    return time == "Infinity:NaN" ? "0:0" : time;
  }

  return (
    <section
      className={cn(
        "w-[250px] sm:w-[300px] md:w-[380px] h-[52px] md:h-[55px] py-2 md:py-3 px-4 md:px-5 rounded-lg flex items-center justify-between",
        position ? "bg-border" : "bg-primary",
        position ? "" : userAppearance
      )}
      ref={fileRef}
    >
      <audio ref={audioRef} src={data} className=" hidden" />
      <div className="w-full flex items-center space-x-2">
        {!audioPlaying ? (
          <Button
            variant="ghost"
            size="icon"
            className="w-5 md:w-6 h-5 md:h-6 hover:bg-transparent hover:text-inherit"
            onClick={togglePlayback}
          >
            <PlayIcon className="w-5 md:w-6 h-5 md:h-6 " />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="w-5 md:w-6 h-5 md:h-6 hover:bg-transparent hover:text-inherit"
            onClick={togglePlayback}
          >
            <PauseIcon className="w-5 md:w-6 h-5 md:h-6" />
          </Button>
        )}
        <div
          className={cn(
            "h-[6px] w-full rounded-sm cursor-pointer",
            position
              ? "bg-black dark:bg-slate-200"
              : "bg-white dark:bg-slate-800"
          )}
          onClick={handleProgressBarClick}
        >
          <div
            className={cn(
              "h-[6px] rounded-sm",
              position ? "bg-slate-400" : " bg-slate-500"
            )}
            style={{ width: `${(currentTime / duration) * 100}%` }}
            onClick={handleProgressBarClick}
          ></div>
        </div>

        <div className="text-[10px] sm:text-xs whitespace-nowrap">
          {formatTime(currentTime)}/{formatTime(duration)}
        </div>
      </div>
    </section>
  );
};

export default MessageAudio;
