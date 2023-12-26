import React from "react";
import { H2 } from "../typography/Headers";
import Modal from "../modal/Modal";

import { useRouter } from "next/router";

export default function LockedLevelModal(props) {
  const router = useRouter();
  const goHome = () => {
    router.push("/levels"); //TODO: later modify?
  };


  return (
    <Modal>
      <H2 className="text-3xl md:text-4xl font-bold">
        אופס! הרמה הזו נעולה עבורך!
      </H2>
      <p className="text-slate-500 sm:text-lg">
        השלם את הרמות הקודמות על מנת לגשת לרמה הזאת!
      </p>
      <div className="flex gap-2 mt-6">
        <button className="bg-purple-600 text-white hover:bg-purple-700 rounded-md p-2">
          חזור לשלב הנוכחי
        </button>
        <button
          className="p-2 border rounded-md border-purple-500 hover:bg-purple-600 hover:text-white"
          onClick={goHome}
        >
          למסך הבית
        </button>
      </div>
    </Modal>
  );
}
