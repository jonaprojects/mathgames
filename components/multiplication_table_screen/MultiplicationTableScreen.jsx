import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Overlay from "../modal/Overlay";
import { useSelector, useDispatch } from "react-redux";
import { PAUSE_SCREEN, startBattle } from "@/store/battleSlice";
import { H1 } from "../typography/Headers";

export default function MultiplicationTableScreen(props) {
  const [isMounted, setIsMounted] = useState(false);
  const battleStatus = useSelector((state) => state.battle.status);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Battle State:", battleStatus);
    setIsMounted(true);
  }, []);

  const show = battleStatus === PAUSE_SCREEN;

  // A modal is closed by default
  if (!show) {
    return <></>;
  }

  if (!isMounted) {
    return null;
  }

  return (
    isMounted &&
    createPortal(
      <Overlay className={`flex items-center justify-center`} close={() => {}}>
        <H1>Hello</H1>
      </Overlay>,
      document.body
    )
  );
}
