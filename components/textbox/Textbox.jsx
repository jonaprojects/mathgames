import React, { useState } from "react";
import classes from "./Textbox.module.css";
import { TypeAnimation } from "react-type-animation";

export function BaseTextBox(props) {
  return (
    <div
      className={`max-w-[40%] text-xs sm:text-sm md:text-base md:max-w-sm max-h-sm p-4 ${classes["speech-bubble"]} ${props.className}`}
    >
      <TypeAnimation sequence={[props.content]} speed={50} />
    </div>
  );
}
export default function TextBox(props) {
  return (
    <div
      className={`${props.className} max-w-[40%] w-64 text-xs sm:text-sm md:text-base md:max-w-sm max-h-sm p-4 ${classes["speech-bubble"]}`}
    >
      <TypeAnimation sequence={[props.content]} speed={50} />
    </div>
  );
}

export function SmallTextBox(props) {
  return (
    <div className={props.className}>
      <div
        className={`${props.className} max-w-[40%] w-48 md:w-40 text-xs sm:text-sm md:text-base md:max-w-sm max-h-sm p-4 ${classes["speech-bubble"]}`}
      >
        <TypeAnimation sequence={[props.content]} speed={50} />
      </div>
    </div>
  );
}
