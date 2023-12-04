import React, { useState } from "react";
import Timer from "../timer/Timer";

export default function Board(props) {
  return (
    <div className="bg-white flex flex-col mb-5 gap-4 justify-center items-center h-48 w-64 max-w-[70%] overflow-hidden">
      <h1 className="text-3xl">
        כמה זה {props.num1}x{props.num2}?
      </h1>
      
      <Timer />
      {/*       <input type="text" className="bg-slate-50 text-sm p-1 w-full" placeholder="הקלד תשובה" />
       */}{" "}
    </div>
  );
}
//todo: רשת של רמות וmodal