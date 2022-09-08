import { useEffect, useState } from "react";
import { Accordion, Spinner } from "brainly-style-guide";

import type { Warn } from "@typings";
import GetWarns from "@brainly/GetWarns";
import flash from "@utils/flashes";

import WarnEntry from "./WarnEntry";
import BanSection from "../banSection/BanSection";

type WarnsBoxPropsType = {
  userId: number;
} & React.HTMLAttributes<HTMLElement>;

const makeWarnsResponsive = (element: HTMLDivElement) => {
  if (!element) return;

  const rect = element.getBoundingClientRect();

  const offsetBottom = window.innerHeight - rect.bottom;
  const offsetRight = window.innerWidth - rect.right;

  if (offsetBottom < 10) {
    element.classList.add("warnsBox--to-top", "sg-bubble--bottom");
  } else if (offsetRight < 10) {
    element.classList.add("warnsBox--to-left", "sg-bubble--right");
  } else {
    element.classList.add("sg-bubble--left");
  }
};

export default function WarnsBox(props: WarnsBoxPropsType) {
  const [error, setError] = useState<Error>(null);
  const [warns, setWarns] = useState<Warn[]>(null);

  useEffect(() => {
    GetWarns(props.userId)
      .then(warns => setWarns(warns))
      .catch(err => setError(err));
  }, []);

  if (error) {
    flash("info", error.message);
    return;
  }

  return (
    <div className="warnsBox sg-bubble" ref={makeWarnsResponsive}>
      <BanSection userId={props.userId} />
      {!warns ?
        <Spinner size="xsmall" /> :
        <Accordion spacing="none" allowMultiple>
          {warns.map(warn => <WarnEntry warn={warn} key={`${warn.time}-${warn.taskId}`} />)}
        </Accordion>
      }
    </div>
  );
}