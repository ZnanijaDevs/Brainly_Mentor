import clsx from "clsx";
import { useState, useEffect } from "react";
import { Flex, Logo, SeparatorVertical } from "brainly-style-guide";
import { ErrorBoundary } from "react-error-boundary";

import GetActions from "@brainly/GetActions";
import type { GetActionsDataType } from "@typings";
import getUserId from "./getUserId";

import ActionsPagination from "./components/pagination/ActionsPagination";
import ActionsContainer from "./components/actions/ActionsContainer";
import SelectWithMentees from "./components/common/SelectWithMentees";
import ModeratorAvatar from "./components/common/ModeratorAvatar";
import ErrorContainer from "./ErrorContainer";

const DEFAULT_ACTIONS_LIMIT = 50;

export default function App() {
  const [actions, setActions] = useState<GetActionsDataType>(null);
  const [error, setError] = useState<Error>(null);

  const [pageId, setPageId] = useState(
    +window.location.href.match(/(?<=\/page:)\d+$/) || 1
  );
  const [actionsLimit, setActionsLimit] = useState(DEFAULT_ACTIONS_LIMIT);

  const fetchActions = (_pageId: number, _actionsLimit: number) => {
    if (actions) setActions(null);

    const userId = getUserId();

    GetActions(userId, _pageId, _actionsLimit)
      .then(data => {
        setActions(data);
        setActionsLimit(_actionsLimit);

        const newURL = `/moderation_new/view_moderator/${userId}/page:${_pageId}`;
        window.history.pushState(null, null, newURL);

        if (error) setError(null);
      })
      .catch(err => setError(err));
  };

  useEffect(() => fetchActions(pageId, actionsLimit), []);
  useEffect(() => {
    if (actions) setPageId(actions.pageId);
  }, [actions]);

  if (error) return (
    <ErrorContainer error={error} onTryAgain={() => {
      setError(null);
      fetchActions(pageId, actionsLimit);
    }} /> 
  );

  return (
    <div id="layout">
      <ErrorBoundary FallbackComponent={({ error, resetErrorBoundary }) => (
        <ErrorContainer error={error} onTryAgain={resetErrorBoundary} />
      )}>
        <header>
          <div>
            <Logo type="znanija" onClick={() => window.location.href = "/"} />
            <ActionsPagination 
              disabled={actions === null}
              hasMorePages={actions?.hasMore} 
              pageId={pageId} 
              actionsLimit={actionsLimit}
              onChange={fetchActions} 
            />
            <SeparatorVertical color="gray-40" />
            <Flex alignItems="center">
              <ModeratorAvatar />
              <SelectWithMentees />
            </Flex>
          </div>
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