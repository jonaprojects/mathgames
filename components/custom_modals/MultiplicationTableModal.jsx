import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Overlay from "../modal/Overlay";
import { useSelector, useDispatch } from "react-redux";
import { H1, H2 } from "../typography/Headers";
import { setCurrentModal, unPauseGame } from "@/store/battleSlice";
export default function MultiplicationTableModal(props) {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const closeMultiplicationTableModal = () => {
    dispatch(setCurrentModal(null));
    dispatch(unPauseGame());
  };

  if (!isMounted) {
    return null;
  }

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    isMounted &&
    createPortal(
      <Overlay
        className={`flex items-center justify-center`}
        close={closeMultiplicationTableModal}
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
