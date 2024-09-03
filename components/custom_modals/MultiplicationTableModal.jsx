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
        className={`flex items-center justify-center w-full`}
        close={closeMultiplicationTableModal}
      >
        <div className="px-1 justify-center items-center">
          <H2 className="mb-7 text-white">לוח הכפל</H2>
          <div className="bg-white border p-1 sm:p-3 md:p-7 w-full justify-center">
            <table
              className="text-sm sm:text-md md:text-lg w-full justify-center"
              style={{ direction: "ltr" }}
            >
              <thead>
                <th className={`w-8 h-8 border border-blue-500 md:w-10 md:h-10 bg-blue-400`}  ></th>
                {numbers.map((number) => {
                  return (
                    <th key={`head${number}`} className={`w-8 h-8 border border-blue-500 md:w-10 md:h-10 bg-blue-400`}>
                      {number}
                    </th>
                  );
                })}
              </thead>
              <tbody>
                {numbers.map((number1) => {
                  return (
                    <tr key={`row${number1}`}>
                      <th className="text-center bg-red-400 border border-blue-500 w-8 h-8 md:w-10 md:h-10,">{number1}</th>
                      {numbers.map((number2) => {
                        const result = number1 * number2;
                        return (
                          <td
                            key={`cell${result}`}
                            className={`border border-slate-300 w-8 h-8 md:w-10 lg:w-12 lg:h-12 md:h-10 text-center hover:bg-blue-300`}
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
