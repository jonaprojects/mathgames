import React from "react";
import { H3 } from "../typography/Headers";
import { P } from "../typography/Paragraphs";

export default function PrivacySection(props) {
  return (
    <section className="mt-7">
      <H3 className="mb-3">{props.title}</H3>
      {props.children}
    </section>
  );
}
