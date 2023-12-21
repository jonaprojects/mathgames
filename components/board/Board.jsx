import React, { useState } from "react";
import Timer from "../timer/Timer";
import BoardContainer from "./BoardContainer";
import { useDispatch, useSelector } from "react-redux";
import TimeBar from "../time_bar/TimeBar";
import {
  setTimeOver,
  setStatus,
  FINISH_EXERCISE_BOARD,
} from "@/store/battleSlice";
import useBattleTimer from "@/hooks/useBattleTimer";
import { floatToPercent } from "@/auxiliaryMethods/auxiliaryMethods";

export default function Board(props) {
  const onTimeOverHandler = () => {
    console.log("Time over handler is working!");
    dispatch(setTimeOver()); // update the battle settings
    dispatch(setStatus(FINISH_EXERCISE_BOARD));
  };

  const dispatch = useDispatch();
  const [secondsLeft, setSecondsLeft] = useBattleTimer({
    totalTime: 30,
    onTimeOver: onTimeOverHandler,
  });

  const battleSettings = useSelector((state) => state.battle.settings);

  return (
    <div className="max-w-[70%]">
      <BoardContainer
        className={`flex flex-col gap-4 justify-center items-center ${props.className}`}
      >
        <h1 className="text-3xl">
          כמה זה {props.num1}x{props.num2}?
        </h1>
        <Timer secondsLeft={secondsLeft} />
      </BoardContainer>
      {secondsLeft <= 10 && (
        <TimeBar
          className="h-1"
          progress={100}
          duration={battleSettings.timeLeftAfterShortened}
        />
      )}
    </div>
  );
}

// >
