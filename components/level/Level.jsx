import React from "react";
import { H2 } from "../typography/Headers";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Level(props) {
  const lockedClasses = `opacity-75 cursor-not-allowed`;
  const router = useRouter();

  const onClickHandler = () => {
    router.push({ pathname: "/play", query: { level: props.levelNum } });
  };
  return (
    <button
      className={`relative bg-${
        props.bg ?? "purple-600"
      } border-white border-4 w-16 h-16 md:w-20 md:h-20 rounded-full cursor-pointer flex justify-center items-center
      ${props.locked && lockedClasses}
      ${props.className ?? ""} `}
      onClick={onClickHandler}
      disabled={props.locked}
    >
      <H2 className="text-white">{props.levelNum}</H2>
      {props.locked && (
        <Image
          src="/darkLock2.svg"
          width={30}
          height={30}
          alt="Locked"
          priority
          className="absolute -top-3"
        />
      )}
    </button>
  );
}
