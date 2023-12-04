import React from "react";

export default function Container(props) {
  return <div className="w-11/12 md:w-9/12 max-w-3xl"> {props.children} </div>;
}
