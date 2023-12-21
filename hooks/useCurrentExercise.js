import { useState } from "react";
import { getRandomNumber } from "@/auxiliaryMethods/auxiliaryMethods";

const generateExercise = (minNumber, maxNumber) => {
  return [
    getRandomNumber(minNumber, maxNumber),
    getRandomNumber(minNumber, maxNumber),
  ];
};

export default function useCurrentExercise(props) {
  const [number1, setNumber1] = useState(null);
  const [number2, setNumber2] = useState(null);

  const loadNewExercise = (minNumber, maxNumber) => {
    const [temp1, temp2] = generateExercise(minNumber, maxNumber);
    setNumber1(temp1);
    setNumber2(temp2);

    return [temp1, temp2];
  };
  return [number1, number2, loadNewExercise];
}
