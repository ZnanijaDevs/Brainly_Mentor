import { useState } from "react";
import clsx from "clsx";
import { Flex, Link, Icon, Text, Avatar, Button } from "brainly-style-guide";

import type { Action } from "@typings";
import replaceTextWithLinks from "@utils/replaceTextWithLinks";
import locales from "@locales";

import Tooltip from "../common/Tooltip";
import SnazzyDate from "../common/SnazzyDate";
import WarnsBox from "../warns/WarnsBox";
import QuestionPreview from "../questionPreview/QuestionPreview";

export default function ActionContainer(props: {
  data: Action;
}) {
  let action = props.data;
  let [visibleTooltip, setVisibleTooltip] = useState<"warns" | "question" | "reason">(null);

  const removeTooltip = () => setVisibleTooltip(null);

  const userId = action.user.id;

  return (
    <Flex 
      className={clsx("action-container", visibleTooltip === "question" && "action-selected")} 
      data-contenttype={action.contentType} 
      data-type={action.type}
      data-deletereason={action.reason.id}
    >
      <Flex alignItems="center" fullWidth>
        <Link href={action.task.link} target="_blank">
          <Icon title={action.localizedType} type={action.icon} size={24} color={action.iconColor} />
        </Link>
        <Link
          onMouseEnter={_ => setVisibleTooltip("reason")}
          onMouseLeave={removeTooltip}
          href={action.task.link}
          target="_blank"
          className="action-type">{action.localizedType}
        </Link>
        <Button
          icon={<Icon color="icon-gray-70" size={24} type="seen" />}
          iconOnly
          size="s"
          type="transparent"
          onClick={() => setVisibleTooltip("question")}
        />
        {action.reason.fullText &&
          <Tooltip visible={visibleTooltip === "reason"}>
            <span>{action.reason.fullText}</span>
          </Tooltip>
        }
        {visibleTooltip === "question" && 
          <QuestionPreview id={action.task.id} onClose={removeTooltip} />
        }
      </Flex>
      <div className="action-content">
        <Text size="small" type="div" breakWords dangerouslySetInnerHTML={{ 
          __html: replaceTextWithLinks(action.content) 
        }} />
      </div>
      <Flex 
        className="action-info"
        justifyContent="space-between" 
        alignItems="center"
        onMouseEnter={_ => setVisibleTooltip("warns")}
        onMouseLeave={removeTooltip}
      >
        <Flex alignItems="center" fullWidth className={clsx("user", action.user.isModerator && "user-is-moderator")}>
          <Link href={action.user.link} target="_blank">
            <Avatar imgSrc={action.user.avatar} size="xs" title={action.user.nick} />
          </Link>
          <Flex direction="column" marginLeft="xs">
            <Link href={action.user.link} target="_blank" color="text-black" size="small" weight="bold" className="user-nick">
              {action.user.nick} 
              {action.user.nick === locales.common.accountDeleted &&
                <Text type="span" size="xsmall" color="text-gray-70" className="user-id-small"> [{userId}]</Text>
              }
            </Link>
            <Text size="xsmall" color="text-gray-70">{action.user.rank}</Text>
          </Flex>
        </Flex>
        {visibleTooltip === "warns" && <WarnsBox
          onMouseEnter={_ => setVisibleTooltip("warns")}
          onMouseOut={removeTooltip}
          userId={userId} />
        }
        <Flex alignItems="center" className="action-date-container">
          <Icon type="counter" color="icon-gray-50" size={16} />
          <Text weight="bold" size="xsmall" color="text-gray-70" className="sg-flex--margin-left-xxs">
            <SnazzyDate date={action.date} />
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}