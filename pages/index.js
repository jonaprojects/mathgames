import Image from "next/image";
import Sprite from "@/components/sprite/Sprite";
import TextBox from "@/components/textbox/Textbox";
import Template from "@/components/template/Template";
import Board from "@/components/board/Board";
import ProgressBar from "@/components/progress_bar/ProgressBar";
import data from "../data/sprites.json";
import Container from "@/components/containers/Container";
import VersusScreen from "@/components/versus_screen/VersusScreen";
export default function Home() {
  var sprites = data.sprites;

  var currentSprite = sprites[2];
  return (
    <>
      <Template>
        <Container>
          <div className=" flex flex-col items-center relative">
            <ProgressBar progress={16} className="mt-6 mb-3" />
            <div className="flex md:gap-2 items-center justify-center mb-5">
              <Sprite src={currentSprite.path} />
              <TextBox content={currentSprite.initialMessage} />
            </div>
            <Board num1={4} num2={3} className="mb-5" />
            <input
              type="text"
              className=" mt-7 bg-slate-50 text-lg p-2 w-full"
              placeholder="הקלד תשובה"
            />
            <ProgressBar progress={34} className="mt-6" />
          </div>
        </Container>
      </Template>
      <VersusScreen show={true} />
    </>
  );
}
