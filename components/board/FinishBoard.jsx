import React from "react";
import { motion } from "framer-motion";
import BoardContainer from "./BoardContainer";

export default function FinishBoard(props) {
  const paragraphClasses = "text-slate-500 text-xl";
  return (
    <BoardContainer className="flex justify-center items-center">
      <div>
        <motion.p className={paragraphClasses}>
          היריב:{" "}
          <span
            className={`font-bold ${
              props.opponentAnswer == props.correctAnswer
                ? "text-green-500"
                : "text-red-600"
            }`}
          >
            {props.opponentAnswer}
          </span>
        </motion.p>
        <motion.p className={paragraphClasses}>
          את/ה: {" "}
          <span
            className={`font-bold ${
              props.userAnswer == props.correctAnswer
                ? "text-green-500"
                : "text-red-600"
            }`}
          >
            {props.userAnswer}
          </span>
        </motion.p>
      </div>
    </BoardContainer>
  );
}
