import { React } from "react";
import RetryModal from "./RetryModal";

export default function LossScreen(props) {
  const title = "הפסד";
  const message = `אולי בפעם הבאה תצליחו להביס את ${props.opponentSprite.name}. אל תוותרו!`;
  return <RetryModal title={title} message={message} />;
}
