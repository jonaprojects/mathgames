import { getRandomNumber } from "./auxiliaryMethods";

export function solveExercise(num1, num2, mistakeChance, mistakeAccuracy) {
  const actualResult = num1 * num2;
  const successChance = 100 - mistakeChance;

  let randomNumber = getRandomNumber(0, 100);

  if (randomNumber > successChance) {
    // then the player will be mistaken
    // calaculate the interval of the mistake
    const interval = Math.max((mistakeAccuracy / 100) * actualResult, 1);

    // A mistaken random result
    const result =
      Math.random() > 0.5
        ? getRandomNumber(actualResult + 1, actualResult + interval)
        : getRandomNumber(actualResult - 1, actualResult - interval);

    // Ensure result is non-negative
    if (result < 0) {
      return 0;
    }
    // just to make sure the result is indeed mistaken
    if (result === actualResult) {
      return actualResult + 1;
    }
    return result;
  } else {
    return actualResult;
  }
}
