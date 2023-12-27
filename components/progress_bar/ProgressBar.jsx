import React from "react";
import { motion } from "framer-motion";
export default function ProgressBar(props) {
  const progressBarTransition = {
    duration: props.duration ?? 0.75, // Adjust the duration (in seconds) as needed
    ease: props.ease ?? "easeInOut", // Adjust the easing function as needed
  };
  return (
    <div
      className={` w-full  bg-slate-300 rounded-xl ${props.className ?? ""} ${
        props.height ?? "h-7"
      }`}
    >
      {!props.hideText && (
        <p className={` text-black font-bold float-left ml-2 inline-block`}>
          100{props.sign ?? ""}
        </p>
      )}
      <motion.div
        className={`h-full bg-purple-600 rounded-xl `}
        transition={progressBarTransition}
        animate={{
          width: [`${props.initialProgress ?? "0"}%`, `${props.progress}%`],
          speed: 3,
        }}
      >
        {!props.hideText && (
          <p className="text-center font-bold px-2 text-white">
            {props.progress}
            {props.sign ?? ""}
          </p>
        )}
      </motion.div>
    </div>
  );
}
