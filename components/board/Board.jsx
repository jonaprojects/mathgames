import React, { useState } from "react";
import Timer from "../timer/Timer";
import BoardContainer from "./BoardContainer";
import { useDispatch } from "react-redux";
import { setTimeOver, setStatus, FINISH_EXERCISE_BOARD } from "@/store/battleSlice";

export default function Board(props) {
  const dispatch = useDispatch();

  const onTimeOverHandler = () => {
    console.log("Time over handler is working!");
    dispatch(setTimeOver()); // update the battle settings
    dispatch(setStatus(FINISH_EXERCISE_BOARD));
  };

  return (
    <BoardContainer className="flex flex-col mb-5 gap-4 justify-center items-center">
      <h1 className="text-3xl">
        כמה זה {props.num1}x{props.num2}?
      </h1>
      <Timer secondsLeft={30} onTimeOver={onTimeOverHandler} />
      {/*       <input type="text" className="bg-slate-50 text-sm p-1 w-full" placeholder="הקלד תשובה" />
       */}{" "}
    </BoardContainer>
  );
}
