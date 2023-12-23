import { useState, useEffect } from "react";

/*
 Handle the current available level in the local storage 
 and provide a simple API to move to the next levels and to 
 not allow going to locked levels.
*/

//! Perhaps separate this into two seperate custom hooks. one for the numbers and the other for the level data.

export default function useCurrentLevel(props) {
  // current level number
  const [currentLevel, setCurrentLevel] = useState(1);

  const [currentLevelObj, setCurrentLevelObj] = useState(null);

  useEffect(() => {
    // make sure our state is updated with the local storage
    try {
      const level = parseInt(localStorage.getItem("currentLevel"));
      if (level) {
        setCurrentLevel(level);
      } else {
        // if there isn't any data in the local storage, then add level 1 as default
        localStorage.setItem("currentLevel", 1);
      }
    } catch (error) {
      localStorage.setItem("currentLevel", 1);
    }
  }, []);

  const gotoNextLevel = () => {
    // first update the local storage, so it adds one to the previous state
    localStorage.setItem("currentLevel", currentLevel + 1);

    // then schedule a state update in the future, updating the currentLevel
    setCurrentLevel((prevLevel) => prevLevel + 1);
  };

  const isLocked = (levelNum) => {
    // check if a level is locked or not
    return levelNum > currentLevel;
  };

  const extractLevelObjFromJson = (levelsData, desiredLevelNum) => {
    const levels = levelsData.levels;
    const currentLevelNumber = Number(desiredLevelNum);
    console.log("current level number: ", typeof currentLevelNumber);

    // check if the level is locked
    if (isLocked(currentLevelNumber)) {
      return null; //? Returning null means that the level is locked!
    }

    const levelObj = levels.filter(
      (level) => level.levelNumber === currentLevelNumber
    )[0];
    setCurrentLevelObj(currentLevelObj);
    return levelObj;
  };

  return [
    currentLevel,
    gotoNextLevel,
    isLocked,
    currentLevelObj,
    setCurrentLevelObj,
    extractLevelObjFromJson,
  ];
}
