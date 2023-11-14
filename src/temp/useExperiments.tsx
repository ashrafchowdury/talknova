"use client";
import { useState, useEffect, useCallback, useRef } from "react";

// Check user movements
export const useIdle = (inactiveTime: number) => {
  const [idle, setIdle] = useState(false);
  let idleTimer: NodeJS.Timeout;

  const resetTimer = () => {
    if (idleTimer) {
      clearTimeout(idleTimer);
    }
    setIdle(false);
    idleTimer = setTimeout(() => {
      setIdle(true);
    }, inactiveTime);
  };

  useEffect(() => {
    resetTimer();

    const events = [
      "mousemove",
      "mousedown",
      "keypress",
      "touchmove",
      "wheel",
      // "visibilitychange",
      "touchstart",
      "resize",
      "focus",
      "blur",
    ];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [inactiveTime]);

  return idle;
};

// check user Visibility
export const useVisibilityChange = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibilityChange = () => setIsVisible(!document.hidden);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isVisible;
};

// check the render is the frist render or not
export const useFirstRender = () => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return isFirstRender.current;
};

// check user leaved the page or not
export const usePageLeave = () => {
  const [isOutside, setIsOutside] = useState(false);

  const handleMouseLeave = () => setIsOutside(true);
  const handleMouseEnter = () => setIsOutside(false);

  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return isOutside;
};
export default usePageLeave;
