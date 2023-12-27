import React from "react";

export default function AudioPlayer({ audioPath }) {
  return (
    <div>
      <audio controls>
        <source src={audioPath} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
