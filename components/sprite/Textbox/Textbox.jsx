import React, { useState } from "react";
import classes from "./Textbox.module.css";
import { TypeAnimation } from "react-type-animation";

export default function TextBox(props) {
  console.log("rendering!");
  return (
    <div
      className={`max-w-[40%] w-64 text-xs sm:text-sm md:text-base md:max-w-sm max-h-sm p-4 ${classes["speech-bubble"]}`}
    >
      <TypeAnimation sequence={[props.content]} speed={50} />
    </div>
  );
}
