import { ChangeEvent, useEffect, useState } from "react";
import { Flex, Text, Select } from "brainly-style-guide";

import locales from "@locales";
import PaginationButton from "./PaginationButton";

const MAX_PAGE_ID = 1_000_000_000;
const ACTIONS_LIMITS = [15, 30, 50, 100, 500];

export default function ActionsPagination(props: {
  disabled: boolean;
  hasMorePages: boolean;
  pageId: number;
  actionsLimit: number;
  onChange: (pageId: number, limit: number) => void;
}) {
  const [actionsLimit, setActionsLimit] = useState(props.actionsLimit);
  const [pageId, setPageId] = useState(props.pageId);

  useEffect(() => {
    if (pageId === props.pageId && actionsLimit === props.actionsLimit) return;
    props.onChange(pageId, actionsLimit);
  }, [pageId, actionsLimit]);

  return (<>
    <Flex id="actions-pagination" alignItems="center" disabled={props.disabled}>
      <PaginationButton 
        disabled={pageId === 1}
        icon="arrow_left" 
        onClick={() => setPageId(pageId - 1)} 
      />
      <Text size="small" weight="bold">
        {props.pageId}
      </Text>
      <PaginationButton 
        icon="arrow_right" 
        onClick={() => setPageId(pageId + 1)} 
        disabled={!props.hasMorePages}
      />
      <PaginationButton 
        icon="arrow_double_right" 
        onClick={() => setPageId(MAX_PAGE_ID)} 
        disabled={!props.hasMorePages}
      />
    </Flex>
    <Select
      options={ACTIONS_LIMITS.map(limit =>
        ({ text: `${limit.toString()} ${locales.common.ofActions}`, value: limit.toString() })
      )}
      size="s"
      onChange={(e: ChangeEvent<HTMLSelectElement>) => setActionsLimit(+e.currentTarget.value)}
      defaultValue={actionsLimit}
      disabled={props.disabled}
    />
  </>);
}