import {
  Box,
  AccordionItem,
  SeparatorHorizontal,
  Flex,
  Text,
  Link
} from "brainly-style-guide";

import type { Warn } from "@typings";
import ReplaceTextWithLinks from "@utils/ReplaceTextWithLinks";

export default function WarnEntry(props: {
  warn: Warn;
}) {
  const warn = props.warn;

  const beautifiedReason = ""; // TODO: add beautified reason

  return (
    <AccordionItem
      className={`warn-${warn.active ? "active" : "inactive"}`}
      padding="xxs"
      title={<Flex direction="column">
        <Link color="text-black" target="_blank" href={`/task/${warn.taskId}`} size="small" weight="bold">
          {beautifiedReason}
        </Link>
        <Text color="text-gray-70" size="xsmall">
          {warn.time}
          <Text type="span" weight="bold" inherited color="text-blue-60"> • {warn.warner}</Text>
        </Text>
      </Flex>}
      titleSize="small"
    >
      <Box padding="xs">
        <div className="warn-reason" dangerouslySetInnerHTML={{ 
          __html: ReplaceTextWithLinks(warn.reason)
        }} />
      </Box>
      <SeparatorHorizontal />
      <Box padding="xs">
        <div className="warn-content" dangerouslySetInnerHTML={{ 
          __html: ReplaceTextWithLinks(warn.content)
        }} />
      </Box>
    </AccordionItem>
  );
}