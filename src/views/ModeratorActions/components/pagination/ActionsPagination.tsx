import { Flex, Text } from "brainly-style-guide";
import PaginationButton from "./PaginationButton";

const MAX_PAGE_ID = 1_000_000_000;

export default function ActionsPagination(props: {
  disabled: boolean;
  hasMorePages: boolean;
  pageId: number;
  onChange: (pageId: number) => void;
}) {
  const pageId = props.pageId;

  return (
    <Flex id="actions-pagination" alignItems="center" disabled={props.disabled}>
      <PaginationButton 
        disabled={pageId === 1}
        icon="arrow_left" 
        onClick={() => props.onChange(pageId - 1)} 
      />
      <Text size="small" weight="bold">
        {props.pageId}
      </Text>
      <PaginationButton 
        icon="arrow_right" 
        onClick={() => props.onChange(pageId + 1)} 
        disabled={!props.hasMorePages}
      />
      <PaginationButton 
        icon="arrow_double_right" 
        onClick={() => props.onChange(MAX_PAGE_ID)} 
        disabled={!props.hasMorePages}
      />
    </Flex>
  );
}