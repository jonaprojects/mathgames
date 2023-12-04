import React from "react";

export default function Container(props) {
  return (
    <main className="flex justify-center mt-11">
      <div className="w-11/12 md:w-9/12 max-w-3xl"> {props.children} </div>{" "}
    </main>
  );
}
