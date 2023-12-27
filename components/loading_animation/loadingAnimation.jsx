import React from "react";
import classes from "./loadingAnimation.module.css";

export default function LoadingAnimation(props) {
  return <span className={`${classes.loader} ${props.className}`}></span>;
}
