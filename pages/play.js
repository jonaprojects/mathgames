import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

//redux state management
import {
  startEntryAnimation,
  ENTRY_ANIMATION,
  IN_BATTLE,
  setTimeOver,
  setStatus,
  INACTIVE,
  LOADING,
  setLoading,
  moveToBattlePage,
  setSentResult,
  FINISH_EXERCISE_BOARD,
  setShortenedTime,
  resetSettingsNewExercise,
  setOpponentSentResult,
  VICTORY_SCREEN,
  LOSS_SCREEN,
  setInFinishLevelScreen,
  LOCKED_LEVEL,
  setLocked,
  MULTIPLICATION_TABLE_MODAL,
  HELP_MODAL,
  PAUSE_MODAL,
  setAddedScores,
  resetSettingsNewLevel,
  TIE_SCREEN,
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

import PauseModal from "@/components/custom_modals/PauseModal";
import MultiplicationTableModal from "@/components/custom_modals/MultiplicationTableModal";
import HelpModal from "@/components/custom_modals/HelpModal";
import {
  unlockNextLevel,
  isLocked,
  extractLevelObjFromJson,
  getCurrentLevel,
} from "@/hooks/handleLevelsLogic";
import LockedLevelModal from "@/components/custom_modals/LockedLevelModal";
import FinishBoard from "@/components/board/FinishBoard";
import TimeBar from "@/components/time_bar/TimeBar";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import useCurrentExercise from "@/hooks/useCurrentExercise";
import usePlayer from "@/hooks/usePlayer";
import useOpponent from "@/hooks/useOpponent";
import { getRandomNumber } from "@/auxiliaryMethods/auxiliaryMethods";
import LossScreen from "@/components/finish_level_screens/LossScreen";
import VictoryScreen from "@/components/finish_level_screens/VictoryScreen";
import AudioPlayer from "@/components/audio_player/AudioPlayer";
import TieScreen from "@/components/finish_level_screens/TieScreen";

// sounds
//import submitSound from "/sounds/submit.mp3";

export default function Home() {
  // dispatching actions on the redux store
  const dispatch = useDispatch();

  // accessing the redux store
  const battleStatus = useSelector((state) => state.battle.settings.status);
  const isLoading = useSelector((state) => state.battle.settings.loading);
  const sentResult = useSelector((state) => state.battle.settings.sentResult);
  const opponentSentResult = useSelector(
    (state) => state.battle.settings.opponentSentResult
  );
  const shortenedTime = useSelector(
    (state) => state.battle.settings.shortenedTime
  );
  const isOnFinishLevelScreen = useSelector(
    (state) => state.battle.settings.inFinishLevelScreen
  );
  const currentModal = useSelector(
    (state) => state.battle.settings.currentModal
  );

  const addedScores = useSelector((state) => state.battle.settings.addedScores);
  // router object to redirect to different pages
  const router = useRouter();

  // the current level that the user is in according to the local storage
  const [currentLevelObj, setCurrentLevelObj] = useState(null);

  // sprites

  // the numbers of the exervise
  const [number1, number2, loadNewExercise] = useCurrentExercise();
  const correctAnswer = number1 * number2; // might be NaN at the beginning

  // handling the two players
  const [
    userScore,
    setUserScore,
    increaseUserScore,
    userAnswer,
    setUserAnswer,
  ] = usePlayer();

  const [
    opponentScore,
    setOpponentScore,
    increaseOpponentScore,
    opponentAnswer,
    setOpponentAnswer,
    currentOpponentSprite,
    setOpponentSprite,
  ] = useOpponent();

  // when the page is ready, just reset the scores, just in case.

  // sounds
  const [playSubmitSound, setPlaySubmitSound] = useState(false);

  //TODO: add the loading state later?

  const onSendResultHandler = useCallback(() => {
    // This will be triggered when the user answers the exercise
    dispatch(setSentResult(true));
    setShortenedTime(true);
    if (!opponentSentResult) {
      // if the opponent hasn't already sent a result
      // then we don't want the user to wait a lot of time!
      let delay = getRandomNumber(1000, 4000);
      if (shortenedTime) {
        // if the time is low don't let the user wait at all.
        delay = 0;
      }
      setTimeout(() => {
        //TODO: clear timeout!
        dispatch(setOpponentSentResult());
        dispatch(setTimeOver());
      }, delay);

      setPlaySubmitSound(true);
    }
  }, [dispatch]);

  const onKeyDownHandler = (event) => {
    if (battleStatus == LOADING || battleStatus == PAUSE_MODAL) {
      return;
    }

    if (event.key === "Enter") {
      // Do something when the "Enter" key is pressed
      if (battleStatus == IN_BATTLE && !sentResult) {
        onSendResultHandler();
      } else if (battleStatus == FINISH_EXERCISE_BOARD && sentResult) {
        onNextExerciseHandler();
      }
    }
  };

  const onNextExerciseHandler = () => {
    // reset the user answer for the next exercise
    setUserAnswer("");
    dispatch(setAddedScores(false));
    // reset different settings regarding the exercise
    dispatch(resetSettingsNewExercise());

    // load a new exercise and the opponent's answer
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
    if (addedScores) {
      return;
    }
    let userGotToHundred = false,
      opponentGotToHundred = false;
    if (userAnswer == correctAnswer) {
      if (userScore + 20 >= 100) {
        //Todo: change from a fixed number
        userGotToHundred = true;
        setUserScore(100);
      } else {
        increaseUserScore(20);
      }
    }

    if (opponentAnswer == correctAnswer) {
      if (opponentScore + 20 >= 100) {
        //Todo: change from a fixed number
        setOpponentScore(100);
        opponentGotToHundred = true;
      } else {
        increaseOpponentScore(20);
      }
    }
    checkWinner(userGotToHundred, opponentGotToHundred);
    dispatch(setAddedScores(true));

    // reset the user score for the next exercise
  }, [
    userAnswer,
    correctAnswer,
    opponentAnswer,
    userScore,
    opponentScore,
    increaseUserScore,
    increaseOpponentScore,
    addedScores,
  ]);

  const checkWinner = useCallback(
    (userGotToHundred, opponentGotToHundred) => {
      console.log("Current Level Obj: ");
      console.log(currentLevelObj);
      if (userGotToHundred || opponentGotToHundred) {
        // if someone got to hundred, check who's winning
        // if someone won, we're going to one of the finish level screens
        dispatch(setInFinishLevelScreen(true));
        if (userGotToHundred && opponentGotToHundred) {
          // In a case of a tie, go to the tie screen
          dispatch(setStatus(TIE_SCREEN));
        } else if (userGotToHundred && !opponentGotToHundred) {
          const nextLevelNumber = currentLevelObj.levelNumber + 1;
          if (isLocked(nextLevelNumber)) {
            // only unlock the next level if it's locked.
            unlockNextLevel();
          }
          dispatch(setStatus(VICTORY_SCREEN));
        } else if (opponentGotToHundred && !userGotToHundred) {
          dispatch(setStatus(LOSS_SCREEN));
        }
      }
    },
    [currentLevelObj]
  );

  const onTimeOverHandler = useCallback(() => {
    /*
    When time to answer the exercises over, move to the finish screen,
    check the Answers, and update the scores accordingly. 
    This will be triggered when the time is over.
     */
    if (battleStatus !== IN_BATTLE) {
      // to make sure it doesn't get invoked accidently
      return;
    }
    // to prevent this method to be invoked twice, for what ever reason
    dispatch(setTimeOver()); // update the battle settings
    dispatch(setSentResult());
    dispatch(setOpponentSentResult());
    dispatch(setStatus(FINISH_EXERCISE_BOARD));
    checkAnswers();
  }, [dispatch, checkAnswers, battleStatus]);

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

  const resetLevelSettings = () => {
    setUserScore(0);
    setOpponentScore(0);
    setUserAnswer("");
    setOpponentAnswer("");
    dispatch(resetSettingsNewLevel());
  };

  useEffect(() => {
    dispatch(moveToBattlePage());
    dispatch(setLoading()); // start loading the page
  }, [dispatch]);

  useEffect(() => {
    console.log("EXECUTING THE FIRST USE EFFECT !!!!!!!!!!!!!");
    if (router.isReady) {
      // reset all the settings

      // load the level object!
      const levelObj = extractLevelObjFromJson(levelsData, router.query.level);
      if (levelObj === null) {
        // then the level is locked!
        console.log("The level is locked!");
        dispatch(setLocked());
        return;
      }
      console.log("RESETTING CURRENT LEVEL OBJ!");
      resetLevelSettings();
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

  if (battleStatus === LOCKED_LEVEL) {
    return (
      <Template>
        <LockedLevelModal />
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
                    className={`bg-slate-50 text-lg p-2 w-9/12`}
                    placeholder="הקלד תשובה"
                    value={userAnswer ?? ""}
                    disabled={battleStatus !== IN_BATTLE || sentResult}
                    onChange={onChangeInputHandler}
                    onKeyDown={onKeyDownHandler}
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
            </Container>
          )}
      </Template>
      <AudioPlayer
        src="/sounds/submit.mp3"
        play={playSubmitSound}
        onFinish={() => setPlaySubmitSound(false)}
      />
      <VersusScreen opponentSprite={currentOpponentSprite} />
      {currentModal === PAUSE_MODAL && <PauseModal />}
      {currentModal === MULTIPLICATION_TABLE_MODAL && (
        <MultiplicationTableModal />
      )}
      {currentModal == HELP_MODAL && <HelpModal />}

      {isOnFinishLevelScreen && battleStatus === LOSS_SCREEN && (
        <LossScreen opponentSprite={currentOpponentSprite} />
      )}
      {isOnFinishLevelScreen && battleStatus === TIE_SCREEN && (
        <TieScreen opponentSprite={currentOpponentSprite} />
      )}
      {isOnFinishLevelScreen && battleStatus === VICTORY_SCREEN && (
        <VictoryScreen nextLevel={parseInt(router.query.level) + 1} />
      )}
    </>
  );
}
