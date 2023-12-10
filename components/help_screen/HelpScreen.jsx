import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Overlay from "../modal/Overlay";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";

import {
  HELP_SCREEN,
  MULTIPLICATION_TABLE_SCREEN,
  PAUSE_SCREEN,
  setStatus,
  startBattle,
  unPauseGame,
} from "@/store/battleSlice";
import { H1, H2 } from "../typography/Headers";
import Container from "../containers/Container";
import { TalkingSpriteShowOnClick } from "../sprite/TalkingSprite";

export default function HelpScreen(props) {
  const [isMounted, setIsMounted] = useState(false);
  const battleSettings = useSelector((state) => state.battle.settings);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Opened the help page!");
    setIsMounted(true);
  }, []);

  const show = battleSettings.status === HELP_SCREEN;

  const closeScreen = () => {
    dispatch(unPauseGame());
    dispatch(startBattle());
  };
  // A modal is closed by default
  if (!show) {
    return <></>;
  }

  if (!isMounted) {
    return null;
  }

  const rabbitWithCarrots = (
    <div className="flex gap-7">
      <Image src="/animals/rabbit2.svg" width={80} height={80} alt="ארנב" />
      <div className="flex">
        <Image src="/carrot2.svg" width={80} height={80} alt="גזר" />
        <Image src="/carrot2.svg" width={80} height={80} alt="גזר" />
        <Image src="/carrot2.svg" width={80} height={80} alt="גזר" />
      </div>
    </div>
  );
  return (
    isMounted &&
    createPortal(
      <Overlay className={`flex justify-center items-center`} close={closeScreen}>
        <div className=" sm:max-w-[85%] lg:max-w-4xl max-h-[85%]  relative overflow-y-scroll">
          <div className="bg-white p-6">
            <button
              className="absolute left-5 top-5 text-3xl text-slate-400 hover:text-slate-500"
              onClick={closeScreen}
            >
              ×
            </button>

            <H1 className="mb-6">עזרה</H1>
            <H2 className="mb-1">מה זה כפל?</H2>
            <p className="mb-2">
              כפל זה חיבור שחוזר על עצמו כמה פעמים. שאנחנו כופלים במספר מסוים,
              אנחנו בעצם אומרים כמה פעמים אנחנו רוצים לחבר אותו.
            </p>
            <p className="mb-2">
              אנחנו מסמנים כפל בסימן של איקס:
              <b> ×</b>
            </p>
            <p className="mb-2">
              למשל, 2×3 זה פעמיים 3, שזה 3+3 = 6. 4×2 זה ארבע פעמים 2, כלומר
              2+2+2+2 שזה 8 1×2 = 2, כי זה פעם אחת 2, שזה פשוט 2.
            </p>
            <p className="mb-4">
              נניח שיש לנו 2 ארנבים, שכל אחד אוכל 3 גזרים ביום. נרצה לדעת כמה
              גזרים שני הארנבים אוכלים ביום.
            </p>
            {rabbitWithCarrots}
            {rabbitWithCarrots}
            <p className="mt-4 mb-3">
              הארנב הראשון אוכל 3 גזרים, וגם הארנב השני אוכל 3 גזרים, ולכן שניהם
              ביחד אוכלים 6 גזרים, כי 3+3 = 6. 3+3 זה בעצם פעמיים 3, שזה כמו
              לכתוב 2×3.
            </p>
            <p>בדקו בעצמכם! ספרו את מספר הגזרים וראו שיש 6!</p>
            <H2 className="mt-5 mb-2">איך משחקים?</H2>
            <p className="mb-2">
              אתם מתחרים ראש בראש בחיות השונות. בכל שלב עליכם כמה מספר תרגילים
              בחשבון. כל תשובה נכונה מזכה אתכם בנקודות. אם הגעתם ל-100 נקודות
              לפני היריב שלכם, תוכלו להתקדם לשלב הבא. ככל שאתם עונים יותר מהר,
              אתם מקבלים בונוס גבוה יותר של נקודות.
            </p>
            <p>
              היזהרו! ככל שמתקדמים בשלבים החיות יותר ויותר מיומנות ומוכשרות!
            </p>
            <TalkingSpriteShowOnClick
              message="לוח הכפל יכול להיות קשה לפעמים, אבל אל תתייאשו!"
              src="/animals/penguin.png"
              className="mb-24"
            />
          </div>
        </div>
      </Overlay>,
      document.body
    )
  );
}
