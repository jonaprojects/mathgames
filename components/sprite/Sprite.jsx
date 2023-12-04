import React from "react";

export default function Sprite(props){
    return (
      <div className="w-32 md:w-48">
        <img
          src={props.src}
          alt={props.alt}
          className="object-contain"
        />
      </div>
    );
}