import PrimaryButtonRounded from "@/components/buttons/PrimaryButtonRounded";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import Card from "@/components/card/Card";
import ProgressBar from "@/components/progress_bar/ProgressBar";
import { TalkingSpriteShowOnClick } from "@/components/sprite/TalkingSprite";
import Template from "@/components/template/Template";
import { H1 } from "@/components/typography/Headers";
import useLevelStatistics from "@/hooks/useLevelStatistics";
import { setInactive } from "@/store/battleSlice";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
export default function Home(props) {
  const router = useRouter();
  const dispatch = useDispatch();

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

  useEffect(() => {
    reloadStatistics(); // make sure the statistics are up to date!
    dispatch(setInactive());
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
      <main className="w-full h-screen flex justify-center mt-20">
        <div className="max-w-[85%] xl:max-w-4xl">
          <div className="text-center">
            <H1 className="mb-1">ברוכים הבאים!</H1>
            <p>
              התחרו עם חיות שונות בתרגילי כפל. עזרו להן להתאמן ונסו לגבור על
              כולן! קדימה, שחקו אותה!
            </p>
            <div className="flex gap-3 justify-center mt-4 mb-7">
              <PrimaryButtonRounded onClick={onPlayClickHandler}>
                עבור למשחק!
              </PrimaryButtonRounded>
              <SecondaryButton onClick={onStoryClickHandler}>
                {" "}
                סיפור הרקע
              </SecondaryButton>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <TalkingSpriteShowOnClick
              src="/animals/pig.png"
              message="היייי מה קורה? אני בובי! רוצה להתפלש איתי בבוץ?"
            />
          </div>

          <Card className="mt-16">
            <h3 className="font-bold text-lg">התקדמות</h3>
            <p className="text-md text-slate-500 mb-4 ">
              השלמת {currentLevel} שלבים מתוך {numOfLevels}
            </p>
            <ProgressBar progress={levelsProgressPercentage} sign="%" />
          </Card>
        </div>
      </main>
    </Template>
  );
}
