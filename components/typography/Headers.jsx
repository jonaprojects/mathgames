export function H1(props) {
  return (
    <h1
      className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold ${
        props.className ?? ""
      }`}
    >
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

