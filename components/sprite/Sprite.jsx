import React from "react";
import Image from "next/image";

export default function Sprite(props) {
  return (
    <div
      className={`w-32 md:w-48 ${props.className}`}
      onClick={props?.onClick ?? (() => {})}
    >
      <Image
        src={props.src}
        alt={props.alt}
        className="object-contain"
        width={500}   // You should specify a width and height for better optimization
        height={500}  // Tailor this to your image's actual dimensions
        layout="responsive" // Keeps the responsiveness behavior like in your Tailwind class
      />
    </div>
  );
}
