import type { ReactNode } from "react";

export default function Tooltip(props: {
  children: ReactNode;
  visible: boolean;
}) {
  return (
    <div className="relative-tooltip" data-tooltip-hidden={!props.visible}>
      {props.children}
    </div>
  );
}