import React from "react";
import Image from "next/image";

export default function Timer(props) {
  return (
    <div className="flex gap-1">
      <p
        className={`${props.secondsLeft < 10 ? "text-red-600 font-bold" : ""}`}
      >
        {props.secondsLeft}
      </p>

      {props.secondsLeft >= 10 ? (
        <Image src="/clock.svg" alt="טיימר" priority width={20} height={20} />
      ) : (
        <Image
          src="/redClock.svg"
          alt="טיימר"
          priority
          width={20}
          height={20}
        />
      )}
    </div>
  );
}
