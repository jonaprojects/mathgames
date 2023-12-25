import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {
  FINISH_EXERCISE_BOARD,
  IN_BATTLE,
  PAUSE_SCREEN,
  setTimeOver,
  shortenTime,
} from "@/store/battleSlice";

export default function useBattleTimer({ totalTime, onTimeOver }) {
  const [secondsLeft, setSecondsLeft] = useState(parseInt(totalTime));
  const battleSettings = useSelector((state) => state.battle.settings);

  const onTimeOverHandler = useCallback(() => {
    if (onTimeOver) {
      onTimeOver();
    }
  }, [onTimeOver]);

  // shortening time the user answers a question
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
        console.log("10 SECONDS LEFT!");
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

  // normal decrease of the time
  useEffect(() => {
    const decreaseTime = () => {
      if (secondsLeft > 0 && battleSettings.status === IN_BATTLE) {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }
    };
    var intervalObj = null;
    if (battleSettings.status === IN_BATTLE) {
      intervalObj = setInterval(decreaseTime, 1000);
      if (
        (secondsLeft <= 0 || battleSettings.timeOver) &&
        intervalObj !== null
      ) {
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

  return [secondsLeft, setSecondsLeft];
}
