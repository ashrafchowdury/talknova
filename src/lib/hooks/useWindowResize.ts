"use client";
import { useState, useEffect } from "react";

const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState<number>(0);

  useEffect(() => {
    const getWindowSize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener("resize", getWindowSize);
    setWindowSize(window.innerWidth);
    return () => {
      window.removeEventListener("resize", getWindowSize);
    };
  }, []);
  return { windowSize };
};

export default useWindowResize;
