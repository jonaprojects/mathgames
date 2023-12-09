import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Timer(props) {
  const [secondsLeft, setSecondsLeft] = useState(parseInt(props.secondsLeft));

  useEffect(() => {
    const decreaseTime = () => {
      console.log(secondsLeft);
      if (secondsLeft > 0) {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }
    };

    const intervalObj = setInterval(decreaseTime, 1000);
    if (secondsLeft <= 0) {
      clearInterval(intervalObj);
    }

    return () => {
      clearInterval(intervalObj);
    };
  }, [secondsLeft]);
  return (
    <div className="flex gap-1">
      <p>{secondsLeft}</p>
      <Image src="/clock.svg" alt="טיימר" priority width={20} height={20} />
    </div>
  );
}
