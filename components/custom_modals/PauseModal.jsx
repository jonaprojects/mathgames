import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Overlay from "../modal/Overlay";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentModal, unPauseGame } from "@/store/battleSlice";
import { H1 } from "../typography/Headers";
import ToolkitButton from "../buttons/ToolkitButton";

export default function PauseModal(props) {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
            dispatch(unPauseGame());
            dispatch(setCurrentModal(null));
          }}
          width={60}
          height={60}
        />
      </Overlay>,
      document.body
    )
  );
}
