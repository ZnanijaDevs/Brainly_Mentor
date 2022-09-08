import type { Action } from "@typings";

import ActionContainer from "./ActionContainer";
import { Spinner, Headline } from "brainly-style-guide";
import locales from "@locales";

export default function ActionsContainer(props: {
  actions?: Action[];
}) {
  const actions = props.actions;

  if (!actions) return <Spinner />;
  if (!actions.length) {
    return <Headline color="text-red-60">{locales.common.noActionsOnThisPage}</Headline>;
  }

  console.debug("Moderator actions", actions);

  return (<>
    {actions.map((action, i) => <ActionContainer data={action} key={`action-${i}`} />)}
  </>);
}