export function H1(props) {
  return (
    <h1
      className={`text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-bold ${
        props.className ?? ""
      }`}
    >
      {props.children}
    </h1>
  );
}

export function ModalHeader(props) {
  return (
    <h1 className="mb-1 md:mb-2 text-3xl md:text-4xl lg:text-5xl">
      {props.children}
    </h1>
  );
}
export function H2(props) {
  return (
    <h1
      className={`text-2xl md:text-3xl lg:text-4xl font-bold ${
        props.className ?? ""
      }`}
    >
      {props.children}
    </h1>
  );
}
