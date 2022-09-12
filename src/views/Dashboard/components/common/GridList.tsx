import clsx from "clsx";
import type { ReactNode } from "react";

const CLASSNAME = "modal-grid-list";

export default function GridList(props: {
  withMargin: boolean;
  elements: ReactNode[];
}) {
  return (
    <div 
      className={clsx(CLASSNAME, props.withMargin && `${CLASSNAME}--with-margin`)}
    >
      {props.elements.map((elementItem, elementIndex) => 
        <div key={`grid-list-item-${elementIndex}`} className={`${CLASSNAME}__item`}>
          {elementItem}
        </div>
      )}
    </div>
  );
}