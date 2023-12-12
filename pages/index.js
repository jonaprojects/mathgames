import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

//redux state management
import {
  startBattle,
  startEntryAnimation,
  endBattle,
  ENTRY_ANIMATION,
  IN_BATTLE,
  FINISH_SCREEN,
  INACTIVE,
  LOADING,
  setLoading,
  PAUSE_SCREEN,
  moveToBattlePage,
  MULTIPLICATION_TABLE_SCREEN,
  HELP_SCREEN,
  setSentResult,
  FINISH_EXERCISE_BOARD,
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
import Toolkit from "@/components/toolkit/Toolkit";

// data
import levelsData from "../data/levels.json";
import spritesData from "../data/sprites.json";

import LoadingScreen from "@/components/loading_screen/LoadingScreen";

// models
import OpponentPlayer from "@/models/Opponent";
import generateExercise from "@/models/ExerciseGenerator";
import PauseScreen from "@/components/pause_screen/PauseScreen";
import MultiplicationTableScreen from "@/components/multiplication_table_screen/MultiplicationTableScreen";
import HelpScreen from "@/components/help_screen/HelpScreen";
import useCurrentLevel from "@/hooks/useCurrentLevel";
import LockedLevelModal from "@/components/custom_modals/LockedLevelModal";
import FinishBoard from "@/components/board/FinishBoard";

export default function Home() {
  // dispatching actions on the redux store
  const dispatch = useDispatch();

  // accessing the redux store
  const battleStatus = useSelector((state) => state.battle.settings.status);
  const isLoading = useSelector((state) => state.battle.settings.loading);
  const sentResult = useSelector((state) => state.battle.settings.sentResult);

  // router object to redirect to different pages
  const router = useRouter();

  // the current level that the user is in according to the local storage
  const [currentLevel, setCurrentLevel, isLocked] = useCurrentLevel();

  const [isLevelLocked, setIsLevelLocked] = useState(false);

  // sprites
  const [currentSprite, setCurrentSprite] = useState(null);
  const [currentOpponent, setCurrentOpponent] = useState(null);

  // level settings
  const [currentLevelObj, setCurrentLevelObj] = useState(null);

  // the numbers of the exervise
  const [number1, setNumber1] = useState();
  const [number2, setNumber2] = useState();

  // the answers that the user and the opponent entered
  const [userAnswer, setUserAnswer] = useState(null);
  const [opponentAnswer, setOpponentAnswer] = useState(null);

  //TODO: add the loading state later?

  const generateNewExercise = () => {
    const [num1, num2] = generateExercise(
      currentLevelObj.minNumber,
      currentLevelObj.maxNumber
    );
    setNumber1(parseInt(num1));
    setNumber2(parseInt(num2));
  };

  const onSendResultHandler = (event) => {
    dispatch(setSentResult());
    try {
      const answer = parseInt(event.target.value);
      setUserAnswer(answer);
    } catch (error) {
      console.log("something went wrong!"); //TODO: later deal with different error cases!
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(moveToBattlePage());
    dispatch(setLoading()); // start loading the page
  }, [dispatch]);

  useEffect(() => {
    console.log("The battle status is ", battleStatus);
  }, [battleStatus]);

  useEffect(() => {
    if (router.isReady) {
      const levels = levelsData.levels; // TODO: export this to a useLevel() hook perhaps?
      const currentLevelNumber = Number(router.query.level);
      console.log("current level number: ", typeof currentLevelNumber);

      // check if the level is locked
      if (isLocked(currentLevelNumber)) {
        console.log("The level is locked!");
        setIsLevelLocked(true);
        //TODO: update somehow the redux storage accordingly!
      }

      const currentLevelObj = levels.filter(
        (level) => level.levelNumber === currentLevelNumber
      )[0];
      console.log("The current opponent id: ", currentLevelObj);
      const sprites = spritesData.sprites; //TODO: export this to a useSprite() hook?
      var currentSprite = sprites.filter(
        (spriteObj) => spriteObj.id == currentLevelObj.opponentID
      )[0];
      const [num1, num2] = generateExercise(
        currentLevelObj.minNumber,
        currentLevelObj.maxNumber
      );
      setNumber1(num1);
      setNumber2(num2);
      setCurrentSprite(currentSprite);

      // opponent object
      setCurrentOpponent(
        new OpponentPlayer(
          currentSprite.id,
          currentSprite.name,
          currentSprite.mistakeChance,
          currentSprite.mistakeAccuracy
        )
      );

      // new exercise

      // after we finished processing all the data we can load the animation
      dispatch(startEntryAnimation()); //? that means we finished loading
    }
  }, [router.isReady, router.query.level, dispatch]);

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
        {battleStatus !== INACTIVE &&
          battleStatus !== ENTRY_ANIMATION &&
          battleStatus !== LOADING && (
            <Container>
              <div className=" flex flex-col items-center relative">
                <ProgressBar progress={16} className="mt-6 mb-3" />
                <div className="flex md:gap-2 items-center justify-center mb-5">
                  <Sprite src={currentSprite.path} />
                  <TextBox content={currentSprite.initialMessage} />
                </div>
                {battleStatus === IN_BATTLE && (
                  <Board num1={number1} num2={number2} className="mb-5" />
                )}
                {battleStatus === FINISH_EXERCISE_BOARD && (
                  <FinishBoard
                    userAnswer={userAnswer}
                    opponentAnswer={opponentAnswer}
                    correctAnswer={number1 * number2}
                  />
                )}
                <div className="w-full flex mt-7">
                  <input
                    type="text"
                    className="bg-slate-50 text-lg p-2 w-9/12"
                    placeholder="הקלד תשובה"
                  />
                  {!sentResult && (
                    <button
                      className="text-white bg-purple-600 p-2 w-3/12 hover:bg-purple-700"
                      onClick={() => dispatch(setSentResult())}
                    >
                      שלח
                    </button>
                  )}
                  {sentResult && (
                    <button className="text-white disabled cursor-default bg-purple-600 opacity-80 p-2 w-3/12">
                      נשלח
                    </button>
                  )}
                </div>

                <ProgressBar progress={34} className="mt-6" />
              </div>
              <Toolkit />
              {battleStatus === PAUSE_SCREEN && <PauseScreen />}
              {battleStatus === MULTIPLICATION_TABLE_SCREEN && (
                <MultiplicationTableScreen />
              )}
              {battleStatus === HELP_SCREEN && <HelpScreen />}
              {isLevelLocked && <LockedLevelModal />}
            </Container>
          )}
      </Template>
      <VersusScreen opponentSprite={currentSprite} />
    </>
  );
}
