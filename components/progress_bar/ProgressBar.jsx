import React from "react";
import { motion } from "framer-motion";
export default function ProgressBar(props) {
  const progressBarTransition = {
    duration: 0.75, // Adjust the duration (in seconds) as needed
    ease: "easeInOut", // Adjust the easing function as needed
  };
  return (
    <div
      className={` w-full  bg-slate-300 h-7 rounded-xl ${
        props.className ?? ""
      } `}
    >
      <p className=" text-black font-bold float-left ml-2 inline-block">100</p>
      <motion.div
        className={`h-full bg-purple-600 rounded-xl `}
        style={{
          width: `${props.progress}%`,
        }}
        transition={progressBarTransition}
        animate={{ width: ["0%", `${props.progress}%`], speed: 3 }}
      >
        <p className="text-center font-bold px-2 text-white">
          {props.progress}
        </p>
      </motion.div>
    </div>
  );
}
