import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Overlay from "../modal/Overlay";
import { useSelector, useDispatch } from "react-redux";
import { PAUSE_SCREEN, startBattle } from "@/store/battleSlice";
import { H1 } from "../typography/Headers";
import ToolkitButton from "../buttons/ToolkitButton";

export default function PauseScreen(props) {
  console.log("entered the pause screen!");
  const [isMounted, setIsMounted] = useState(false);
  const battleSettings = useSelector((state) => state.battle.settings);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Battle settings:", battleSettings);
    setIsMounted(true);
  }, []);

  const show = battleSettings.status === PAUSE_SCREEN;

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
        <ToolkitButton
          src="/pause.svg"
          alt="עצור את המשחק"
          onClick={() => {
            dispatch(startBattle());
          }}
          width={60}
          height={60}
        />
      </Overlay>,
      document.body
    )
  );
}
