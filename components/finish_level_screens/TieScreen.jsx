import { React } from "react";
import RetryModal from "./RetryModal";

export default function TieScreen(props) {
  const title = "תיקו!";
  const message = `תיקו! כמעט הצלחתם! המשיכו להתאמן על מנת להביס את ${props.opponentSprite.name}!`;
  return <RetryModal title={title} message={message} />;
}
