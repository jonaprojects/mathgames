import React from "react";
import { SmallTextBox } from "../textbox/Textbox";

export default function Sprite(props) {
  return (
    <div
      className={`w-32 md:w-48 ${props.className}`}
      onClick={props?.onClick ?? (() => {})}
    >
      <img src={props.src} alt={props.alt} className="object-contain" />
    </div>
  );
}
