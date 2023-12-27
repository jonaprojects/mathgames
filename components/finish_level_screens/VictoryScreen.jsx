import React from "react";
import Modal from "../modal/Modal";
import PrimaryButton from "../buttons/PrimaryButton";
import { H1, ModalHeader } from "../typography/Headers";
import SVGButton from "../buttons/SVGButton";
import { useRouter } from "next/router";

export default function VictoryScreen(props) {
  const router = useRouter();
  const onHome = () => {
    router.push("/levels"); //TODO: later change?
  };

  const onClose = () => {
    onHome(); //! Debatable User experience
  };

  const onNextLevel = () => {
    router.push(`/play?level=${props.nextLevel}`);
  };
  return (
    <Modal onClose={onClose}>
      <ModalHeader>ניצחון!</ModalHeader>
      <p className="mb-5 md:mb-8 md:text-lg">
        מזל טוב! אתה יכול להתקדם לשלב הבא!
      </p>
      <div className="flex gap-3">
        <SVGButton
          src="/home.svg"
          alt="בית"
          width={24}
          height={24}
          onClick={onHome}
          bg="bg-cyan-200"
          hover="hover:bg-cyan-300"
        />
        <SVGButton
          src="./leftArrow.svg"
          alt="next level"
          bg="bg-purple-200"
          hover="hover:bg-purple-400"
          onClick={onNextLevel}
        />
      </div>
    </Modal>
  );
}
