import { getRandomNumber } from "@/auxiliaryMethods/auxiliaryMethods";

/**
 * Represents an opponent player.
 * @class
 */
export default class OpponentPlayer {
  /**
   * @constructor
   * @param {number} id - The unique identifier for the player.
   * @param {string} name - The name of the player.
   * @param {number} mistakeChance - The chance of making a mistake (between 0 and 100).
   * @param {number} minNumber - The minimum number for exercises.
   * @param {number} maxNumber - The maximum number for exercises.
   * @param {number} mistakeAccuracy - The accuracy of mistakes (between 0 and 100).
   */
  constructor(id, name, mistakeChance, minNumber, maxNumber, mistakeAccuracy) {
    this.id = parseInt(id); // a number
    this.name = name;
    this.mistakeChance = parseFloat(mistakeChance); // a number between 0 and 100
    this.mistakeAccuracy = parseFloat(mistakeAccuracy); // a number between 0 and 100;
  }

  solveExercise(num1, num2) {
    const actualResult = num1 * num2;
    const successChance = 100 - this.mistakeChance;

    let randomNumber = getRandomNumber(0, 100);

    if (randomNumber > successChance) {
      // then the player will be mistaken
      // calaculate the interval of the mistake
      const interval = Math.max((this.mistakeAccuracy / 100) * actualResult, 1);

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
}
