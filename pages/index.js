import PrimaryButtonRounded from "@/components/buttons/PrimaryButtonRounded";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import LevelProgressCard from "@/components/custom_cards/LevelProgressCard";
import LoadingAnimation from "@/components/loading_animation/loadingAnimation";
import { TalkingSpriteShowOnClick } from "@/components/sprite/TalkingSprite";
import Template from "@/components/template/Template";
import { H1 } from "@/components/typography/Headers";
import { getRandomSprite } from "@/hooks/handleSpritesLogic";
import useLevelStatistics from "@/hooks/useLevelStatistics";
import { resetSettingsOnOtherPages } from "@/store/battleSlice";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Home(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [spriteObj, setSpriteObj] = useState(null);
  const [
    currentLevel,
    numOfLevels,
    levelsProgressPercentage,
    reloadStatistics,
  ] = useLevelStatistics();

  const onPlayClickHandler = useCallback(() => {
    router.push(`/play?level=${currentLevel}`);
  }, [currentLevel, router]);

  const onStoryClickHandler = () => {
    router.push("/story");
  };

  const [loadingSprite, setLoadingSprite] = useState(true);

  useEffect(() => {
    dispatch(resetSettingsOnOtherPages());
    setLoadingSprite(true);
    reloadStatistics(); // make sure the statistics are up to date!
    try {
      setSpriteObj(getRandomSprite());
    } catch {
      // if we couldn't load the random sprite for some reason, choose a static value.
      setSpriteObj({
        id: 20,
        type: "tiger",
        name: "רוקי",
        path: "/animals/tiger.png",
        initialMessage:
          "אני רוקי. אני אף פעם לא מוותר, ואני נחוש להיות הכי טוב בעולם בחשבון.",
      });
    } finally {
      setLoadingSprite(false);
    }
  }, []);

  return (
    <Template>
      {/* <div
        className="h-screen w-full"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/jungleBackground.jpg")`,
          backgrounRrepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="flex items-center justify-center w-full h-full">
          <H1 className="text-white">ברוכים הבאים!</H1>
          <div className="bg-"></div>
        </div>
      </div> */}
      <main className="w-full flex justify-center mt-20">
        <div className="max-w-[85%] xl:max-w-4xl">
          <div className="text-center">
            <H1 className="mb-1">ברוכים הבאים!</H1>
            <p>
              התחרו עם חיות שונות בתרגילי כפל. עזרו להן להתאמן ונסו לגבור על
              כולן! קדימה, שחקו אותה!
            </p>
            <div className="flex gap-3 justify-center mt-4 mb-11">
              <PrimaryButtonRounded onClick={onPlayClickHandler}>
                עבור למשחק!
              </PrimaryButtonRounded>
              <SecondaryButton onClick={onStoryClickHandler}>
                {" "}
                סיפור הרקע
              </SecondaryButton>
            </div>
          </div>
          {loadingSprite && (
            <div className="flex w-full justify-center items-center">
              <LoadingAnimation />
            </div>
          )}
          {!loadingSprite && (
            <div className="flex w-full justify-center">
              <TalkingSpriteShowOnClick
                src={spriteObj.path}
                message={spriteObj.initialMessage}
              />
            </div>
          )}
          <LevelProgressCard
            currentLevel={currentLevel}
            numOfLevels={numOfLevels}
            progress={levelsProgressPercentage}
          />
        </div>
      </main>
    </Template>
  );
}
