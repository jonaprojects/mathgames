import React from "react";

export default function Card(props) {
  return (
    <div
      className={`bg-white border border-purple-600 p-2 rounded-lg
    ${props.className}
    `}
    >
      {props.children}
    </div>
  );
}
