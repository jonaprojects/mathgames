import Container from "@/components/containers/Container";
import Level from "@/components/level/Level";
import ProgressBar from "@/components/progress_bar/ProgressBar";
import Template from "@/components/template/Template";
import { H1 } from "@/components/typography/Headers";
import React from "react";

export default function Levels() {
  const DUMMY_LEVELS = []; //TODO: later replace with actual data
  for (let i = 0; i < 30; i++) {
    DUMMY_LEVELS.push(i + 1);
  }

  return (
    <Template>
      <main>
        <Container>
          <H1 className="mb-6 mt-5">שלבים</H1>
          <p className="text-lg text-slate-500">השלמת 27% מהשלבים!</p>
          <ProgressBar progress={27} className="mb-12"/>
          <div className="grid grid-cols-3 grid-auto-flow m-0 p-0 gap-y-4 justify-items-center content-center gap-1 md:gap-y-6 md:gap-4 md:grid-cols-4">
            {DUMMY_LEVELS.map((levelNum) => {
              return (
                <Level
                  levelNum={levelNum}
                  key={levelNum}
                  className="m-0 p-0"
                  locked={levelNum < 8 ? false : true}
                />
              );
            })}
          </div>
        </Container>
      </main>
    </Template>
  );
}
