import React, { useState } from "react";
import Timer from "../timer/Timer";
import BoardContainer from "./BoardContainer";

export default function Board(props) {
  return (
    <BoardContainer>
      <h1 className="text-3xl">
        כמה זה {props.num1}x{props.num2}?
      </h1>
      <Timer secondsLeft={30} />
      {/*       <input type="text" className="bg-slate-50 text-sm p-1 w-full" placeholder="הקלד תשובה" />
       */}{" "}
    </BoardContainer>
  );
}
//todo: רשת של רמות וmodal
