import { motion } from "framer-motion";
import { cn } from "~/utils/cn";
import type { LoadingStage } from "~/types";

interface LoadingAnimationProps {
  stage: LoadingStage;
}

export function LoadingAnimation({ stage }: LoadingAnimationProps) {
  const variants = {
    connecting: {
      scale: [1, 1.2, 1],
      transition: { repeat: Infinity, duration: 1 },
    },
    researching: {
      rotate: [0, 360],
      transition: { repeat: Infinity, duration: 1.5, ease: "linear" },
    },
    completed: {
      scale: [0.8, 1.1, 1],
      transition: { duration: 0.5 },
    },
    canceled: {
      scale: [0.8, 1.1, 1],
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={variants}
      animate={stage}
      className={cn(
        "w-8 h-8 rounded-full",
        stage === "connecting" && "bg-blue-500",
        stage === "researching" && "bg-purple-500",
        stage === "completed" && "bg-green-500",
        stage === "canceled" && "bg-red-500",
        stage === "idle" && "bg-gray-300"
      )}
    />
  );
}