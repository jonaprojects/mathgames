import React from "react";

export default function Sprite(props){
    return (
        <div className="h-auto md:w-64 w-48">
            <img src={props.src} alt={props.alt}
            
            />
        </div>
    );
}