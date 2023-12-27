import { floatToPercent } from "@/auxiliaryMethods/auxiliaryMethods";

export const NUM_OF_LEVELS = 30;

export const getCurrentLevel = () => {
  try {
    const level = parseInt(localStorage.getItem("currentLevel"));
    if (!level) {
      // if the level is invalid, then reset it to 1.
      localStorage.setItem("currentLevel", 1);
      return 1;
    }
    return level;
  } catch {
    return null;
  }
};
export const unlockNextLevel = () => {
  // first update the local storage, so it adds one to the previous state
  const currentLevel = getCurrentLevel();
  localStorage.setItem("currentLevel", currentLevel + 1);
};

export const isLocked = (levelNum) => {
  // check if a level is locked or not
  const currentLevel = getCurrentLevel();
  return levelNum > currentLevel;
};

export const extractLevelObjFromJson = (levelsData, desiredLevelNum) => {
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
  return levelObj;
};

export const getLevelStatistics = () => {
  const currentLevel = getCurrentLevel();
  const levelsProgressPercentage = floatToPercent(currentLevel / NUM_OF_LEVELS);
  return [currentLevel, NUM_OF_LEVELS, levelsProgressPercentage];
};
