import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Overlay from "../modal/Overlay";
import { useSelector, useDispatch } from "react-redux";
import {
  IN_BATTLE,
  MULTIPLICATION_TABLE_SCREEN,
  PAUSE_SCREEN,
  setStatus,
  startBattle,
  unPauseGame,
} from "@/store/battleSlice";
import { H1, H2 } from "../typography/Headers";
import Container from "../containers/Container";

export default function MultiplicationTableScreen(props) {
  const [isMounted, setIsMounted] = useState(false);
  const battleSettings = useSelector((state) => state.battle.settings);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Opened the multiplication table screen!");
    setIsMounted(true);
  }, []);

  const show = battleSettings.status === MULTIPLICATION_TABLE_SCREEN;

  const closeScreen = () => {
    dispatch(unPauseGame());
    dispatch(startBattle());
  };
  // A modal is closed by default
  if (!show) {
    return <></>;
  }

  if (!isMounted) {
    return null;
  }

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    isMounted &&
    createPortal(
      <Overlay
        className={`flex items-center justify-center`}
        close={closeScreen}
      >
        <div className="px-1">
          <H1 className="mb-7 text-white">לוח הכפל</H1>
          <div className="bg-white border p-1 sm:p-3 md:p-7 ">
            <table
              className="text-sm sm:text-md md:text-xl"
              style={{ direction: "ltr" }}
            >
              <thead>
                <th></th>
                {numbers.map((number) => {
                  return (
                    <th key={`head${number}`} className="">
                      {number}
                    </th>
                  );
                })}
              </thead>
              <tbody>
                {numbers.map((number1) => {
                  return (
                    <tr key={`row${number1}`}>
                      <th className="text-center">{number1}</th>
                      {numbers.map((number2) => {
                        const result = number1 * number2;
                        return (
                          <td
                            key={`cell${result}`}
                            className={`border border-slate-300 p-2 md:p-4 text-center hover:bg-slate-200`}
                          >
                            {result}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Overlay>,
      document.body
    )
  );
}
