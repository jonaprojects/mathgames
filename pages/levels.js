import React, { useEffect, useState } from "react";

// Custom Components
import Container from "@/components/containers/Container";
import Level from "@/components/level/Level";
import ProgressBar from "@/components/progress_bar/ProgressBar";
import Template from "@/components/template/Template";
import { H1 } from "@/components/typography/Headers";
import { useDispatch } from "react-redux";
import { setInactive } from "@/store/battleSlice";
import { floatToPercent } from "@/auxiliaryMethods/auxiliaryMethods";
import { getCurrentLevel } from "@/hooks/handleLevelsLogic";
import useCurrentLevel from "@/hooks/useCurrentLevel";
import useLevelStatistics from "@/hooks/useLevelStatistics";

export default function Levels() {
  const dispatch = useDispatch();

  const [
    currentLevel,
    numOfLevels,
    levelsProgressPercentage,
    reloadStatistics,
  ] = useLevelStatistics();

  useEffect(() => {
    reloadStatistics(); // make sure the statistics are up to date!
    dispatch(setInactive());
  }, []);

  const DUMMY_LEVELS = [];
  for (let i = 0; i < numOfLevels; i++) {
    DUMMY_LEVELS.push(i + 1);
  }

  return (
    <Template>
      <main>
        <Container>
          <H1 className="mb-6 mt-5">שלבים</H1>
          <p className="text-lg text-slate-500">
            השלמת {levelsProgressPercentage}% מהשלבים!
          </p>
          <ProgressBar
            progress={levelsProgressPercentage}
            className="mb-12"
            sign="%"
          />
          <div className="grid grid-cols-3 grid-auto-flow m-0 p-0 gap-y-4 justify-items-center content-center gap-1 md:gap-y-6 md:gap-4 md:grid-cols-4">
            {DUMMY_LEVELS.map((levelNum) => {
              return (
                <Level
                  levelNum={levelNum}
                  key={levelNum}
                  className="m-0 p-0"
                  locked={levelNum > currentLevel}
                />
              );
            })}
          </div>
        </Container>
      </main>
    </Template>
  );
}
