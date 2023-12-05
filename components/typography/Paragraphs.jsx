import { Frank_Ruhl_Libre } from "next/font/google";

const frank = Frank_Ruhl_Libre({ subsets: ["latin"], weight: ["400", "700"] });

export function StoryParagraph(props) {
  return (
    <p className={`text-2xl md:text-3xl ${frank.className} ${props.className ?? ""}`}>
      {props.children}
    </p>
  );
}
