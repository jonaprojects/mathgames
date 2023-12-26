import React from "react";
import Image from "next/image";

export default function SVGButton(props) {
  return (
    <button
      className={`rounded-full p-2 
    ${props.bg ?? "bg-slate-200"}
    ${props.hover ?? "hover:bg-slate-300"}`}
      onClick={props.onClick}
    >
      <Image
        src={props.src}
        alt={props.alt}
        width={props.width ?? 24}
        height={props.height ?? 24}
      />
    </button>
  );
}
