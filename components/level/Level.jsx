import React from "react";
import { H2 } from "../typography/Headers";
import Image from "next/image";

export default function Level(props) {
  const lockedClasses = `opacity-75 cursor-not-allowed`  
  return (
    <div
      className={`relative bg-${
        props.bg ?? "purple-600"
      } border-white border-4 w-16 h-16 md:w-20 md:h-20 rounded-full cursor-pointer flex justify-center items-center
      ${props.locked && lockedClasses}
      ${props.className ?? ""} `}
    >
      <H2 className="text-white">{props.levelNum}</H2>
      {props.locked && (
        <Image
          src="/darkLock2.svg"
          width={30}
          height={30}
          alt="Locked"
          priority
          className="absolute -top-3"
          onClick={() => alert("locked!")}
        />
      )}
    </div>
  );
}
