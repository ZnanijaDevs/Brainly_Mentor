import clsx from "clsx";
import { useState, useEffect } from "react";
import { Flex, Logo, Button, Icon } from "brainly-style-guide";
import { ErrorBoundary } from "@sentry/react";

import GetActions from "@brainly/GetActions";
import type { GetActionsDataType } from "@typings";
import getUserId from "./getUserId";

import ActionsPagination from "./components/pagination/ActionsPagination";
import ActionsContainer from "./components/actions/ActionsContainer";
import SelectWithMentees from "./components/common/SelectWithMentees";
import ModeratorAvatar from "./components/common/ModeratorAvatar";
import ErrorContainer from "./ErrorContainer";

export default function App() {
  const [actions, setActions] = useState<GetActionsDataType>(null);
  const [error, setError] = useState<Error>(null);

  const [pageId, setPageId] = useState(
    +window.location.href.match(/(?<=\/page:)\d+$/) || 1
  );

  const fetchActions = (_pageId: number) => {
    if (actions) setActions(null);

    const userId = getUserId();

    GetActions(userId, _pageId)
      .then(data => {
        setActions(data);

        const newURL = `/moderation_new/view_moderator/${userId}/page:${_pageId}`;
        window.history.pushState(null, null, newURL);

        if (error) setError(null);
      })
      .catch(err => setError(err));
  };

  useEffect(() => fetchActions(pageId), []);
  useEffect(() => {
    if (actions) setPageId(actions.pageId);
  }, [actions]);

  if (error) return (
    <ErrorContainer error={error} onTryAgain={() => {
      setError(null);
      fetchActions(pageId);
    }} /> 
  );

  return (
    <div id="layout">
      <ErrorBoundary fallback={({ error, resetError }) => (
        <ErrorContainer error={error} onTryAgain={resetError} />
      )}>
        <header>
          <Flex justifyContent="space-between" alignItems="center">
            <Logo type="znanija" onClick={() => window.location.href = "/"} />
            <ActionsPagination 
              disabled={actions === null}
              hasMorePages={actions?.hasMore} 
              pageId={pageId} 
              onChange={fetchActions} 
            />
            <Flex alignItems="center">
              <ModeratorAvatar />
              <SelectWithMentees />
              <Button type="solid-indigo" icon={<Icon type="verified" color="icon-white" />} iconOnly />
            </Flex>
          </Flex>
        </header>
        <main>
          <div id="actions-grid-container" className={clsx(!actions && "centered-container")}>
            <ActionsContainer actions={actions?.actions} />
          </div>
        </main>
      </ErrorBoundary>
    </div>
  );
}