import React from "react";

export default function PrimaryButton(props) {
  return (
    <button
      className={`text-white bg-purple-600 p-2 
      ${
        props.disabled
          ? "disabled cursor-default opacity-80"
          : "hover:bg-purple-700"
      }
      ${props.className ?? ""}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
