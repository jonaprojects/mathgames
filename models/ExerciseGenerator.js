import { getRandomNumber } from "@/auxiliaryMethods/auxiliaryMethods";

export default function generateExercise(minNumber, maxNumber) {
  return [
    getRandomNumber(minNumber, maxNumber),
    getRandomNumber(minNumber, maxNumber),
  ];
}
