import React, { useState, useEffect } from "react";

//redux state management
import {
  startBattle,
  startEntryAnimation,
  endBattle,
  ENTRY_ANIMATION,
  IN_BATTLE,
  FINISH_SCREEN,
} from "@/store/battleSlice";
import { useDispatch, useSelector } from "react-redux";

// custom components
import Sprite from "@/components/sprite/Sprite";
import TextBox from "@/components/textbox/Textbox";
import Template from "@/components/template/Template";
import Board from "@/components/board/Board";
import ProgressBar from "@/components/progress_bar/ProgressBar";
import Container from "@/components/containers/Container";
import VersusScreen from "@/components/versus_screen/VersusScreen";

// data
import levelsData from "../data/levels.json";
import spritesData from "../data/sprites.json";

import { useRouter } from "next/router";
import { current } from "@reduxjs/toolkit";
import LoadingScreen from "@/components/loading_screen/LoadingScreen";

export default function Home() {
  const dispatch = useDispatch();
  const battleStatus = useSelector((state) => state.battle.status);
  const router = useRouter();
  const [currentSprite, setCurrentSprite] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(startEntryAnimation());
  }, [dispatch]);

  useEffect(() => {
    if (router.isReady) {
      // TODO: add some loading logic!!!!!
      setIsLoading(false); // WE FINISHED LOADING!
      const levels = levelsData.levels; // TODO: export this to a useLevel() hook perhaps?
      const currentLevelNumber = Number(router.query.level);
      console.log("current level number: ", typeof currentLevelNumber);
      const currentLevelObj = levels.filter(
        (level) => level.levelNumber === currentLevelNumber
      )[0];
      console.log("The current opponent id: ", currentLevelObj);
      const sprites = spritesData.sprites; //TODO: export this to a useSprite() hook?
      var currentSprite = sprites.filter(
        (spriteObj) => spriteObj.id == currentLevelObj.opponentID
      )[0];

      setCurrentSprite(currentSprite);
    }
  }, [router.isReady, router.query.level]);

  if (isLoading) {
    return (
      <Template>
        <LoadingScreen />
      </Template>
    );
  }
  return (
    <>
      <Template>
        {(battleStatus === IN_BATTLE || //TODO: later modify this condition
          battleStatus === FINISH_SCREEN) && (
          <Container>
            <div className=" flex flex-col items-center relative">
              <ProgressBar progress={16} className="mt-6 mb-3" />
              <div className="flex md:gap-2 items-center justify-center mb-5">
                <Sprite src={currentSprite.path} />
                <TextBox content={currentSprite.initialMessage} />
              </div>
              <Board num1={4} num2={3} className="mb-5" />
              <input
                type="text"
                className=" mt-7 bg-slate-50 text-lg p-2 w-full"
                placeholder="הקלד תשובה"
              />
              <ProgressBar progress={34} className="mt-6" />
            </div>
          </Container>
        )}
      </Template>
      <VersusScreen opponentSprite={currentSprite} />
    </>
  );
}
