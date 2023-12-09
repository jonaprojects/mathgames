import React from "react";

export default function BoardContainer(props) {
  return (
    <div className="bg-white flex flex-col mb-5 gap-4 justify-center items-center h-48 w-64 max-w-[70%] overflow-hidden">
      {props.children}
    </div>
  );
}
