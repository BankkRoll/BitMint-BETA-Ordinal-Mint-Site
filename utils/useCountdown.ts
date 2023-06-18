// utils/useCountdown.ts
import { useState, useEffect } from 'react';

type TimeLeft = {
  hours?: number;
  minutes?: number;
  seconds?: number;
};

const useCountdown = (targetDate: Date): TimeLeft => {
  const calculateTimeLeft = (): TimeLeft => {
    let difference = +targetDate - +new Date();
    let timeLeft: TimeLeft = {};
    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  return timeLeft;
};

export default useCountdown;
export type { TimeLeft };
