import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

//redux state management
import {
  startBattle,
  startEntryAnimation,
  endBattle,
  ENTRY_ANIMATION,
  IN_BATTLE,
  FINISH_SCREEN,
  setTimeOver,
  setStatus,
  INACTIVE,
  LOADING,
  setLoading,
  PAUSE_SCREEN,
  moveToBattlePage,
  MULTIPLICATION_TABLE_SCREEN,
  HELP_SCREEN,
  setSentResult,
  FINISH_EXERCISE_BOARD,
  setShortenedTime,
  resetSettingsNewExercise,
} from "@/store/battleSlice";
import { useDispatch, useSelector } from "react-redux";

// auxiliary methods
import { solveExercise } from "@/auxiliaryMethods/opponent";

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

import PauseScreen from "@/components/pause_screen/PauseScreen";
import MultiplicationTableScreen from "@/components/multiplication_table_screen/MultiplicationTableScreen";
import HelpScreen from "@/components/help_screen/HelpScreen";
import useCurrentLevel from "@/hooks/useCurrentLevel";
import LockedLevelModal from "@/components/custom_modals/LockedLevelModal";
import FinishBoard from "@/components/board/FinishBoard";
import TimeBar from "@/components/time_bar/TimeBar";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import useCurrentExercise from "@/hooks/useCurrentExercise";
import usePlayer from "@/hooks/usePlayer";
import useOpponent from "@/hooks/useOpponent";

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
  const [
    currentLevel,
    setCurrentLevel,
    isLocked,
    currentLevelObj,
    setCurrentLevelObj,
    extractLevelObjFromJson,
  ] = useCurrentLevel();

  const [isLevelLocked, setIsLevelLocked] = useState(false);

  // sprites

  // the numbers of the exervise
  const [number1, number2, loadNewExercise] = useCurrentExercise();
  const correctAnswer = number1 * number2; // might be NaN at the beginning

  // handling the two players
  const [userScore, increaseUserScore, userAnswer, setUserAnswer] = usePlayer();
  const [
    opponentScore,
    increaseOpponentScore,
    opponentAnswer,
    setOpponentAnswer,
    currentOpponentSprite,
    setOpponentSprite,
  ] = useOpponent();

  //TODO: add the loading state later?

  const onSendResultHandler = useCallback(() => {
    // This will be triggered when the user answers the exercise
    dispatch(setSentResult(true));
    setShortenedTime(true);
  }, [dispatch]);

  const onNextExerciseHandler = () => {
    dispatch(resetSettingsNewExercise());

    const [num1, num2] = loadNewExercise(
      currentLevelObj.minNumber,
      currentLevelObj.maxNumber
    );
    loadOpponentAnswer(
      num1,
      num2,
      currentLevelObj.mistakeChance,
      currentLevelObj.opponentMistakeAccuracy
    );
  };
  
  //TODO:  move this logic to somewhere perhaps?
  const checkAnswers = useCallback(() => {
    // Checking if the user and the oppponent were each right, and increasing the score accordingly
    if (userAnswer == correctAnswer) {
      increaseUserScore(20); //Todo: change from a fixed number
    }

    if (opponentAnswer == correctAnswer) {
      increaseOpponentScore(20); //Todo: change from a fixed number
    }
  }, [
    userAnswer,
    correctAnswer,
    opponentAnswer,
    increaseUserScore,
    increaseOpponentScore,
  ]);

  const onTimeOverHandler = useCallback(() => {
    /*
    When time to answer the exercises over, move to the finish screen,
    check the Answers, and update the scores accordingly. 
    This will be triggered when the time is over.
     */
    console.log("Time over handler is working!");
    dispatch(setTimeOver()); // update the battle settings
    dispatch(setStatus(FINISH_EXERCISE_BOARD));
    checkAnswers();
  }, [dispatch, checkAnswers]);

  const onChangeInputHandler = (event) => {
    setUserAnswer(event.target.value);
  };

  const loadOpponentAnswer = (num1, num2, mistakeChance, mistakeAccuracy) => {
    const tempAns = solveExercise(num1, num2, mistakeChance, mistakeAccuracy);
    setOpponentAnswer(tempAns);
  };

  const loadOpponentSprite = (levelObj) => {
    const sprites = spritesData.sprites; //TODO: export this to an external hook?
    var currentSpriteTemp = sprites.filter(
      (spriteObj) => spriteObj.id == levelObj.opponentID
    )[0];
    setOpponentSprite(currentSpriteTemp);
    return currentSpriteTemp; // to use locally until the state updates.
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
      const levelObj = extractLevelObjFromJson(levelsData, router.query.level);
      if (levelObj === null) {
        // then the level is locked!
        console.log("The level is locked!");
        setIsLevelLocked(true);
      }
      setCurrentLevelObj(levelObj);
      // load the sprites after loading the level's data
      const currentOpponentSprite = loadOpponentSprite(levelObj);

      // load the information about the current exercise
      // the loadNewExercise method implicitly updates the numbers states.
      const [num1, num2] = loadNewExercise(
        levelObj.minNumber,
        levelObj.maxNumber
      );
      // opponent object
      loadOpponentAnswer(
        num1,
        num2,
        levelObj.mistakeChance,
        levelObj.opponentMistakeAccuracy
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
                <ProgressBar progress={opponentScore} className="mt-6 mb-3" />
                <div className="flex md:gap-2 items-center justify-center mb-5">
                  <Sprite src={currentOpponentSprite.path} />
                  <TextBox content={currentOpponentSprite.initialMessage} />
                </div>
                {battleStatus === IN_BATTLE && (
                  <Board
                    num1={number1}
                    num2={number2}
                    onTimeOver={onTimeOverHandler}
                  />
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
                    value={userAnswer ?? ""}
                    onChange={onChangeInputHandler}
                  />
                  {!sentResult && battleStatus === IN_BATTLE && (
                    <PrimaryButton
                      className="w-3/12"
                      onClick={onSendResultHandler}
                    >
                      שלח
                    </PrimaryButton>
                  )}
                  {sentResult && battleStatus === IN_BATTLE && (
                    <PrimaryButton className="w-3/12" disabled={true}>
                      נשלח
                    </PrimaryButton>
                  )}
                  {sentResult && battleStatus === FINISH_EXERCISE_BOARD && (
                    <PrimaryButton
                      className="w-3/12"
                      onClick={onNextExerciseHandler}
                    >
                      המשך
                    </PrimaryButton>
                  )}
                </div>

                <ProgressBar
                  initial={0}
                  progress={userScore}
                  className="mt-6 mb-3"
                />
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
      <VersusScreen opponentSprite={currentOpponentSprite} />
    </>
  );
}
