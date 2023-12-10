import React from "react";

export default function Overlay(props) {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      // Only trigger the closeModal function when the overlay (outside the modal content) is clicked
      props?.close();
    }
  };
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-50 max-w-full max-h-full min-w-full min-h-full p-0 m-0 ${props?.className}`}
      onClick={handleOverlayClick}
    >
      {props.children}
    </div>
  );
}
