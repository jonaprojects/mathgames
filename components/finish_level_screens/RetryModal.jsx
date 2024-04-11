import React from "react";
import Modal from "../modal/Modal";
import Image from "next/image";
import { H1, ModalHeader } from "../typography/Headers";
import SVGButton from "../buttons/SVGButton";
import { useRouter } from "next/router";

export default function RetryModal(props) {
  const router = useRouter();
  const onRetry = () => {
    router.reload();
  };

  const onHome = () => {
    router.push("/levels");
  };

  return (
    <Modal onClose={() => {}}>
      <ModalHeader className="mb-2">{props.title}</ModalHeader>
      <p>
        {props.message}
      </p>
      <div className="flex gap-2 mt-7">
        <SVGButton
          src="/retry.svg"
          alt="נסה שוב"
          width={24}
          height={24}
          onClick={onRetry}
          bg="bg-purple-200"
          hover="hover:bg-purple-300"
        />
        <SVGButton
          src="/home.svg"
          alt="בית"
          width={24}
          height={24}
          onClick={onHome}
          bg="bg-cyan-200"
          hover="hover:bg-cyan-300"
        />
      </div>
    </Modal>
  );
}
