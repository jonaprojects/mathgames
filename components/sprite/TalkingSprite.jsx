import { useState } from "react";
import TextBox, { SmallTextBox } from "../textbox/Textbox";
import Image from "next/image";

export default function TalkingSprite(props) {
  return (
    <div
      className={`w-32 md:w-48 relative ${props.className}`}
      onClick={props?.onClick ?? (() => {})}
    >
      <Image
        src={props.src}
        alt={props.alt}
        className="object-contain"
        width={500}   // You should specify a width and height for better optimization
        height={500}  // Tailor this to your image's actual dimensions
        layout="responsive" // Keeps the responsiveness behavior like in your Tailwind class
      />
      {props.show && (
        <div className="relative">
          <SmallTextBox className="absolute -top-2" content={props.message} />
        </div>
      )}
    </div>
  );
}

export function TalkingSpriteShowOnClick(props) {
  const [showTextbox, setShowTextbox] = useState(false);
  const onClickHandler = () => {
    setShowTextbox((prevShow) => !prevShow);
  };

  return (
    <TalkingSprite
      src={props.src}
      onClick={onClickHandler}
      show={showTextbox}
      message={props.message}
      className={props.className}
    />
  );
}
