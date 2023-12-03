import Image from "next/image";
import Sprite from "@/components/sprite/Sprite";
import TextBox from "@/components/sprite/Textbox/Textbox";
import Template from "@/components/template/Template";
import Board from "@/components/board/Board";

export default function Home() {
  return (
    <Template>
      <main className="flex justify-center mt-11">
        <div className="w-11/12 md:w-9/12 flex flex-col items-center relative max-w-2xl">
          <div className=" flex md:gap-2 items-center justify-center">
            <Sprite src="/animals/penguin.png" />
            <TextBox content="שלום, אני פיני הפינגווין. אני אוהב מאוד מתמטיקה, ואני חושב שאני יותר טוב ממך בהרבה" />
          </div>
          <Board num1={4} num2={3} />
          <input
            type="text"
            className=" mt-7 bg-slate-50 text-lg p-2 w-full"
            placeholder="הקלד תשובה"
          />
        </div>
      </main>
    </Template>
  );
}
