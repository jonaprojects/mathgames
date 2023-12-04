import Image from "next/image";
import Sprite from "@/components/sprite/Sprite";
import TextBox from "@/components/sprite/Textbox/Textbox";
import Template from "@/components/template/Template";
import Board from "@/components/board/Board";
import ProgressBar from "@/components/progress_bar/ProgressBar";
import data from "../data/sprites.json";
import Container from "@/components/containers/Container";
export default function Home() {
  var sprites = data.sprites;
  return (
    <Template>
      <main className="flex justify-center mt-11">
        <Container>
          <div className=" flex flex-col items-center relative">
            <ProgressBar progress={16} className="mt-6 mb-3" />
            <div className="flex md:gap-2 items-center justify-center mb-5">
              <Sprite src={sprites[2].path} />
              <TextBox content={sprites[2].initialMessage} />
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
      </main>
    </Template>
  );
}
