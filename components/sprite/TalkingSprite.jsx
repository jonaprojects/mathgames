import { useState } from "react";
import TextBox, { SmallTextBox } from "../textbox/Textbox";

export default function TalkingSprite(props) {
  return (
    <div
      className={`w-32 md:w-48 relative ${props.className}`}
      onClick={props?.onClick ?? (() => {})}
    >
      <img src={props.src} alt={props.alt} className="object-contain" />
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
    />
  );
}
