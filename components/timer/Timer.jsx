import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { IN_BATTLE, PAUSE_SCREEN } from "@/store/battleSlice";

export default function Timer(props) {
  const [secondsLeft, setSecondsLeft] = useState(parseInt(props.secondsLeft));
  const battleStatus = useSelector((state) => state.battle.settings.status);
  useEffect(() => {
    const decreaseTime = () => {
      if (secondsLeft > 0 && battleStatus === IN_BATTLE) {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }
    };
    var intervalObj = null;
    if (battleStatus === IN_BATTLE) {
      intervalObj = setInterval(decreaseTime, 1000);
      if (secondsLeft <= 0 && intervalObj !== null) {
        clearInterval(intervalObj);
      }
    }
    return () => {
      if (intervalObj !== undefined && intervalObj !== null) {
        clearInterval(intervalObj);
      }
    };
  }, [secondsLeft, battleStatus]);
  return (
    <div className="flex gap-1">
      <p>{secondsLeft}</p>
      <Image src="/clock.svg" alt="טיימר" priority width={20} height={20} />
    </div>
  );
}
