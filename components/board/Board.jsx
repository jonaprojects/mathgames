import React, { useCallback, useState } from "react";
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
  const dispatch = useDispatch();

  const [secondsLeft, setSecondsLeft] = useBattleTimer({
    totalTime: 30,
    onTimeOver: props.onTimeOver,
  });

  const timeLeftAfterShortened = useSelector(
    (state) => state.battle.settings.timeLeftAfterShortened
  );

  return (
    <div className="max-w-[85%]">
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
          duration={timeLeftAfterShortened}
        />
      )}
    </div>
  );
}

// >
