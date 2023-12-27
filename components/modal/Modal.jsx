import Overlay from "./Overlay";

export default function Modal(props) {
  return (
    <Overlay
      className={`flex justify-center items-center ${props.className}`}
      close={props.onClose}
    >
      <div className={`flex justify-center items-center max-w-[85%]`}>
        <div className="bg-white p-7 rounded-sm max-w-2xl">
          {props.children}
        </div>
      </div>
    </Overlay>
  );
}
