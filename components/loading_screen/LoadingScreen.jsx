import React, { useState, useEffect } from "react";
import Overlay from "../modal/Overlay";
import classes from "./LoadingScreen.module.css";
import { H1 } from "../typography/Headers";
import Container from "../containers/Container";
import { getRandomElement } from "@/auxiliaryMethods/auxiliaryMethods";
import { motion } from "framer-motion";
import LoadingAnimation from "../loading_animation/loadingAnimation";
const MESSAGES = [
  "טבלת הכפל היא כמו מפת אוצר למספרים. היא עוזרת לך למצוא את כל התשובות במהירות, כמו קוד סודי למתמטיקה!",
  "הידעתם? המצרים הקדומים השתמשו בשיטות עתיקות כדי לכפול מספרים.",
  "אם חבורת פינגווינים עומדת ב-2 שורות, כך שבכל שורה יש 5 פינגווינים, נוכל לחשב כמה פינגווינים יש סך הכל בלי לספור את כולם בכך שנכפיל את מספר השורות (2) במספר הפינגווינים (5).",
];

export default function LoadingScreen(props) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const setRandomMessage = () => {
    const randomMessage = getRandomElement(MESSAGES);
    // change the animation key so the fade in repeats itself as well
    setAnimationKey((prevKey) => (prevKey === 0 ? 1 : 0));
    setCurrentMessage(randomMessage);
  };

  useEffect(() => {
    function initializeMessage() {
      setShowMessage(true);
      setRandomMessage();
      setInterval(setRandomMessage, 5000);
    }
    const timeoutId = setTimeout(initializeMessage, 3000);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <Overlay
      className={`flex flex-col gap-10 items-center text-center justify-center`}
      close={() => {}}
    >
      <Container>
        <H1 className="text-white mb-3">טוען...</H1>
        {showMessage && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            key={animationKey}
            transition={{ duration: 1 }}
            className="text-slate-200 sm:text-xl"
          >
            {currentMessage}
          </motion.p>
        )}
        <LoadingAnimation className="mt-7 ml-11" />
      </Container>
    </Overlay>
  );
}
