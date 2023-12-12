import React from "react";

export default function BoardContainer(props) {
  return (
    <div
      className={`bg-white h-48 w-64 max-w-[70%] overflow-hidden ${props.className}`}
    >
      {props.children}
    </div>
  );
}
