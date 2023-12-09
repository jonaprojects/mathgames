import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ToolkitButton(props) {
  return (
    <motion.button
      onClick={props.onClick}
      className="border rounded-full p-3 bg-white hover:bg-slate-200"
      animate={props?.animate}
      transition={props?.transition}
      initial={props?.initial}
      exit={props?.exit}
    >
      <Image
        src={props.src}
        alt={props.alt}
        width={props?.width ?? 24}
        height={props?.height ?? 24}
        priority
      />
    </motion.button>
  );
}
