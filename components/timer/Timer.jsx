import React from "react";
import Image from "next/image";

export default function Timer(props){
    return (
      <div className="flex gap-1">
        <p>21</p>
        <Image src="/clock.svg" alt="טיימר" priority width={20} height={20} />
      </div>
    );
}