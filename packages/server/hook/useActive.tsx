"use client";

import { useEffect } from "react";
import { useCookies } from "@/lib/hooks";
import { useIdle, usePageLeave } from "@/temp/useExperiments";

const useActive = (isLoading: boolean, active: (status: boolean) => void) => {
  const isOutSide = usePageLeave();
  const idle = useIdle(30000);
  const { uid } = useCookies();

  useEffect(() => {
    if (!isLoading) {
      if (!navigator.onLine) {
        active(false);
      } else if (isOutSide) {
        active(false);
      } else if (idle) {
        active(false);
      } else {
        active(true);
      }
    }
  }, [isOutSide, idle, isLoading]);
};

export default useActive;
