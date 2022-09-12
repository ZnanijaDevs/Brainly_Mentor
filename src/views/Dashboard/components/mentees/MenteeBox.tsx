import { Avatar, Link, Flex, Counter, Text } from "brainly-style-guide";

import type { MyMenteeDataType } from "@lib/GetMyMentees";
import locales from "@locales";
import LinkInNewTab from "../common/LinkInNewTab";

export default function MenteeBox(props: {
  mentee: MyMenteeDataType;
}) {
  const mentee = props.mentee;

  return (
    <div className="mentee-box">
      <LinkInNewTab link={mentee.link}>
        <Avatar size="m" imgSrc={mentee.avatar} />
      </LinkInNewTab>
      <Flex direction="column">
        <Link href={mentee.link} target="_blank" weight="bold" color="text-black">
          {mentee.nick}
        </Link>
        <Text size="xsmall">
          {mentee.ranks.join(" / ")}
        </Text>
      </Flex>
      <LinkInNewTab link={`/moderation_new/view_moderator/${mentee.id}`}>
        <Counter color="blue-60" title={locales.common.viewActions}>{mentee.dailyActionsCount}</Counter>
      </LinkInNewTab>
    </div>
  );
}