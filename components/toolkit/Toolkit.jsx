import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ToolkitButton from "../buttons/ToolkitButton";
import {
  HELP_SCREEN,
  MULTIPLICATION_TABLE_SCREEN,
  PAUSE_SCREEN,
  pauseGame,
  setStatus,
} from "@/store/battleSlice";
import { useDispatch } from "react-redux";

export default function Toolkit(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();

  const openPauseScreen = () => {
    dispatch(pauseGame());
    dispatch(setStatus(PAUSE_SCREEN));
  };

  const openMultiplicationTableScreen = () => {
    dispatch(pauseGame());
    dispatch(setStatus(MULTIPLICATION_TABLE_SCREEN));
  };

  const openHelpScreen = () => {
    dispatch(pauseGame());
    dispatch(setStatus(HELP_SCREEN));
  };
  const onClickHandler = () => {
    setIsExpanded((prevExpanded) => !prevExpanded); // toggle the expanded state
  };
  return (
    <div className="mt-5 sm:mt-11 mb-3 ">
      <div className="flex gap-6">
        <ToolkitButton
          src="/toolkit.svg"
          alt="תיבת הכלים"
          onClick={onClickHandler}
        />

        <div className="flex gap-1">
          <AnimatePresence mode="wait">
            {isExpanded && (
              <ToolkitButton
                src="/pause.svg"
                alt="עצור את המשחק"
                onClick={openPauseScreen}
                animate={{
                  x: 0,
                  rotate: 360,
                  opacity: 1,
                }}
                initial={{ x: 50, rotate: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                exit={{ x: 50, rotate: 0, opacity: 0 }}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isExpanded && (
              <ToolkitButton
                src="/math.svg"
                alt="לוח הכפל"
                onClick={openMultiplicationTableScreen}
                animate={{
                  x: 0,
                  rotate: 360,
                }}
                initial={{ x: 60, rotate: 0 }}
                transition={{ duration: 0.5 }}
                exit={{ x: 60, rotate: 0, opacity: 0 }}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isExpanded && (
              <ToolkitButton
                src="/help.svg"
                alt="עזרה"
                onClick={openHelpScreen}
                animate={{
                  x: 0,
                  rotate: 360,
                }}
                initial={{ x: 60, rotate: 0 }}
                transition={{ duration: 0.5 }}
                exit={{ x: 120, rotate: 0, opacity: 0 }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
