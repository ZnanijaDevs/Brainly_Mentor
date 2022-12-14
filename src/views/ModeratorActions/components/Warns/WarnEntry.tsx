import {
  Box,
  AccordionItem,
  SeparatorHorizontal,
  Flex,
  Text,
  Link
} from "brainly-style-guide";

import replaceTextWithLinks from "@utils/replaceTextWithLinks";
import getShortDeleteReason from "@lib/getShortDeleteReason";
import type { Warn } from "@typings";

export default function WarnEntry(props: {
  warn: Warn;
}) {
  const warn = props.warn;

  const beautifiedReason = getShortDeleteReason(warn.reason)?.name;

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
          __html: replaceTextWithLinks(warn.reason)
        }} />
      </Box>
      <SeparatorHorizontal />
      <Box padding="xs">
        <div className="warn-content" dangerouslySetInnerHTML={{ 
          __html: replaceTextWithLinks(warn.content)
        }} />
      </Box>
    </AccordionItem>
  );
}