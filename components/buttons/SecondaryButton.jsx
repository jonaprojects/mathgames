import React from "react";

export default function SecondaryButton(props) {
  return (
    <button
      className={`border p-2 rounded-lg text-lg border-purple-600 hover:bg-purple-600 hover:text-white ${
        props.className ?? ""
      }`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
