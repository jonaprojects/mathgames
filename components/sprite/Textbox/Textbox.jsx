import React, { useState } from "react";
import classes from "./Textbox.module.css";

export default function TextBox(props) {
  return (
    <div className={`max-w-[40%] text-xs sm:text-sm md:text-base md:max-w-sm max-h-sm p-4 w-fit h-fit ${classes['speech-bubble']}`}>
      {props.content}
    </div>
  );
}
