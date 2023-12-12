import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {
  FINISH_EXERCISE_BOARD,
  IN_BATTLE,
  PAUSE_SCREEN,
  setTimeOver,
  shortenTime,
} from "@/store/battleSlice";

export default function Timer(props) {
  const dispatch = useDispatch();
  const [secondsLeft, setSecondsLeft] = useState(parseInt(props.secondsLeft));
  const battleSettings = useSelector((state) => state.battle.settings);

  const onTimeOverHandler = useCallback(() => {
    if (props.onTimeOver) {
      props.onTimeOver();
    }

  }, [props]);

  useEffect(() => {
    if (battleSettings.status !== IN_BATTLE) {
      return;
    }
    // only if we are on battle mode
    if (
      !battleSettings.shortenedTime &&
      !battleSettings.timeOver &&
      secondsLeft > 10
    ) {
      // enter here only if we haven't shortened the time yet, and the time is over 10 seconds
      const temp1 = battleSettings.sentResult ? 1 : 0;
      const temp2 = battleSettings.opponentSentResult ? 1 : 0;
      if (temp1 + temp2 === 1) {
        // only if one of us sent it... so the other one is waiting.
        setSecondsLeft(10);
      }
    }
  }, [
    battleSettings.sentResult,
    battleSettings.opponentSentResult,
    battleSettings.status,
    battleSettings.timeOver,
    battleSettings.shortenedTime,
    secondsLeft,
  ]);
  useEffect(() => {
    const decreaseTime = () => {
      if (secondsLeft > 0 && battleSettings.status === IN_BATTLE) {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }
    };
    var intervalObj = null;
    if (battleSettings.status === IN_BATTLE) {
      intervalObj = setInterval(decreaseTime, 1000);
      if (secondsLeft <= 0 && intervalObj !== null) {
        console.log("finished timer!"); //! Later remove this log
        clearInterval(intervalObj);
        onTimeOverHandler();
      }
    }
    return () => {
      if (intervalObj !== undefined && intervalObj !== null) {
        clearInterval(intervalObj);
      }
    };
  }, [secondsLeft, battleSettings, onTimeOverHandler]);
  return (
    <div className="flex gap-1">
      <p className={`${secondsLeft < 10 ? "text-red-600 font-bold" : ""}`}>
        {secondsLeft}
      </p>

      {secondsLeft >= 10 ? (
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
