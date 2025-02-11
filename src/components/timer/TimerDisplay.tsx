import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TimerDisplayProps {
  initialTime?: number; // in seconds
  onComplete?: () => void;
}

const TimerDisplay = ({
  initialTime = 300,
  onComplete = () => {},
}: TimerDisplayProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          setProgress((newTime / initialTime) * 100);
          if (newTime === 0) {
            setIsRunning(false);
            onComplete();
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, initialTime, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const adjustTime = (amount: number) => {
    const newTime = Math.max(0, timeLeft + amount);
    setTimeLeft(newTime);
    setProgress((newTime / initialTime) * 100);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] w-full bg-[#2A2E37] text-white relative">
      {/* Timer Display */}
      <div className="flex justify-center mb-8 -mt-40 h-[400px]">
        <AnimatePresence mode="popLayout">
          {formatTime(timeLeft)
            .split("")
            .map((digit, index) => (
              <motion.span
                key={`${index}-${digit}`}
                className="text-[400px] font-normal tracking-wider text-white inline-block w-[240px] text-center"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {digit}
              </motion.span>
            ))}
        </AnimatePresence>
      </div>

      {/* Quick Add Buttons */}
      <div className="flex gap-2 mb-8 mt-15">
        <Button
          variant="secondary"
          className="bg-[#3A3F4B] hover:bg-[#4A4F5B] text-white"
          onClick={() => adjustTime(30)}
        >
          +0:30
        </Button>
        <Button
          variant="secondary"
          className="bg-[#3A3F4B] hover:bg-[#4A4F5B] text-white"
          onClick={() => adjustTime(60)}
        >
          +1:00
        </Button>
        <Button
          variant="secondary"
          className="bg-[#3A3F4B] hover:bg-[#4A4F5B] text-white"
          onClick={() => adjustTime(300)}
        >
          +5:00
        </Button>
      </div>

      {/* Progress Bar */}
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0">
        <div
          className="h-2 bg-[#7B89F4] rounded-full transition-all duration-300 ease-in-out"
          style={{
            width: `${progress}%`,
            opacity: isRunning ? 1 : 0.5,
          }}
        />
      </div>

      {/* Play/Pause Button */}
      <Button
        className="w-96 h-14 bg-[#7B89F4] hover:bg-[#8B99FF] text-white gap-2 rounded-full text-lg font-medium"
        onClick={() => setIsRunning(!isRunning)}
      >
        {isRunning ? (
          <>
            <Pause className="h-5 w-5" />
            Pause
          </>
        ) : (
          <>
            <Play className="h-5 w-5" />
            Start
          </>
        )}
      </Button>
    </div>
  );
};

export default TimerDisplay;
