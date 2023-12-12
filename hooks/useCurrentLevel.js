import React, { useState, useEffect } from "react";

export default function useCurrentLevel(props) {
  const [currentLevel, setCurrentLevel] = useState(1);

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

  return [currentLevel, gotoNextLevel, isLocked];
}
