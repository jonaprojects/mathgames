import React from "react";
import Card from "../card/Card";
import ProgressBar from "../progress_bar/ProgressBar";

export default function LevelProgressCard(props) {
  return (
    <Card className="mt-16">
      <h3 className="font-bold text-lg">התקדמות</h3>
      <p className="text-md text-slate-500 mb-4 ">
        השלמת {props.currentLevel - 1} שלבים מתוך {props.numOfLevels}
      </p>
      <ProgressBar progress={props.progress} sign="%" />
    </Card>
  );
}
