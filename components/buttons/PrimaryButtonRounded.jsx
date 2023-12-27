import React from "react";

export default function PrimaryButtonRounded(props) {
  return (
    <button
      className={`bg-purple-600 text-white rounded-lg p-2 hover:bg-purple-700 ${
        props.className ?? ""
      }`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
