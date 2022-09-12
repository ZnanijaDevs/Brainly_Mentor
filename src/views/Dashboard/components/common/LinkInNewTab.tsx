import type { PropsWithChildren } from "react";

export default function LinkInNewTab(props: PropsWithChildren<{
  link: string;
}>) {
  return (
    <a href={props.link} target="_blank" rel="noreferrer" className="link-with-cursor">
      {props.children}
    </a>
  );
}