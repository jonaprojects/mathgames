import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Overlay from "../modal/Overlay";
import Sprite from "../sprite/Sprite";
import { H1 } from "../typography/Headers";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { ENTRY_ANIMATION, startBattle } from "@/store/battleSlice";

//TODO: add context or redux instead of DUMMY data and props arguments
export default function VersusScreen(props) {
  const [isMounted, setIsMounted] = useState(false);
  const battleStatus = useSelector((state) => state.battle.status);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Battle State:", battleStatus);
    setIsMounted(true);
  }, []);

  const show = battleStatus === ENTRY_ANIMATION;

  const closeVersusScreen = () => {
    dispatch(startBattle());
  };
  // A modal is closed by default
  if (!show) {
    return <></>;
  }

  const DUMMY_SPRITE = {
    type: "lion",
    name: "לביא",
    path: "/animals/lion.png",
    initialMessage: "אני הולך לנצח בקלות! לא סתם קוראים לי מלך הג'ונגל",
  };

  const MY_SPRITE = {
    type: "penguin",
    name: "פיני",
    path: "/animals/penguin.png",
    initialMessage:
      "שלום, אני פיני הפינגווין. אני אוהב מאוד מתמטיקה, ואני חושב שאני יותר טוב ממך בהרבה",
  };

  const variants = {
    fadeOut: { opacity: 0 },
  };

  if (!isMounted) {
    return null;
  }
  return (
    isMounted &&
    createPortal(
      <Overlay
        className={`flex items-center justify-center`}
        close={() => {
          console.log("close it");
        }}
      >
        <motion.div
          className="flex gap-4 items-center"
          animate={{
            opacity: 0,
          }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ x: "100%", opacity: 0 }}
            animate={[
              {
                x: 0,
                opacity: 1,
                transition: { ease: "easeOut", duration: 0.4 },
              },
            ]}
          >
            <H1 className="text-white">{MY_SPRITE.name}</H1>
            <Sprite src={MY_SPRITE.path} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            transition={{ ease: "easeOut", duration: 0.4, delay: 0.5 }}
            className="text-white md:text-6xl font-bold text-4xl"
          >
            נגד
          </motion.h1>
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ x: "-100%", opacity: 0 }}
            animate={[
              {
                x: 0,
                opacity: 1,
                transition: { ease: "easeOut", duration: 0.4, delay: 1 },
              },
            ]}
          >
            <H1 className="text-white">{DUMMY_SPRITE.name}</H1>
            <Sprite src={DUMMY_SPRITE.path} />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
          }}
          onAnimationComplete={closeVersusScreen}
          transition={{ delay: 2.4, duration: 2, times: [null, 0.5, 1] }}
          className="absolute flex items-center justify-center w-full h-full text-center"
        >
          <h1 className="text-white md:text-8xl font-bold text-5xl">התחל!</h1>
        </motion.div>
      </Overlay>,
      document.body
    )
  );
}
