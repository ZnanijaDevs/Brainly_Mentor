import { useState, useMemo } from "react";
import { Flex, Button, Text, Icon, Link, IconPropsType, IconType } from "brainly-style-guide";

import replaceTextWithLinks from "@utils/replaceTextWithLinks";
import getShortDeleteReason from "@lib/getShortDeleteReason";
import type { QuestionLogEntry } from "@typings";
import locales from "@locales";

const ENTRY_ICONS: Record<QuestionLogEntry["type"], {
  color: IconPropsType["color"],
  type: IconType;
}> = {
  "accepted": { color: "icon-green-50", type: "check" },
  "deleted": { color: "icon-red-50", type: "trash" },
  "best": { color: "icon-yellow-50", type: "crown" },
  "added": { color: "icon-green-50", type: "plus" },
  "edited": { color: "icon-blue-50", type: "pencil" },
  "info": { color: "icon-blue-50", type: "info" },
  "reported": { color: "icon-red-50", type: "report_flag" }
};

export default function LogEntry(props: {
  entry: QuestionLogEntry;
}) {
  const [detailsVisible, setDetailsVisible] = useState(false);

  let entry = props.entry;
  let entryIcon = ENTRY_ICONS[entry.type];

  const beautifiedEntryText = useMemo(() => {
    let pieces = entry.text
      .split(/(\$[A-Za-z0-9А-Яа-яё\s]+-\d+\$)/)
      .map(piece => {
        if (!piece.startsWith("$")) return piece;
  
        let linkParts = piece.replaceAll("$", "").split("-");
        let userLink = `/users/redirect_user/${linkParts[1]}`;
  
        return (
          <Link size="small" weight="bold" key={linkParts.join()} target="_blank" href={userLink}>
            {linkParts[0]}
          </Link>
        );
      });
  
    if (entry.type === "deleted") {
      let deleteReason = getShortDeleteReason(entry.descriptions[0]?.text)?.name;
    
      if (deleteReason) 
        pieces.push(` ${locales.common.as} `, 
          <Text weight="bold" inherited type="span">{deleteReason}</Text>
        );
    
      if (entry.warn) 
        pieces.push(" ",
          <Text weight="bold" inherited color="text-red-60" type="span">{locales.common.withWarn}</Text>
        );
    }
  
    return pieces;
  }, []);

  return (
    <Flex direction="column" className="question-log-entry">
      <div className="question-log-entry-header">
        <Flex marginRight="xxs">
          <Icon size={16} color={entryIcon.color} type={entryIcon.type} />
        </Flex>
        <Text size="small" type="div">{...beautifiedEntryText}</Text>
        <Text className="question-log-entry-time" weight="bold" color="text-gray-50">{entry.time}</Text>
        <Button
          size="s"
          variant="transparent" 
          icon={<Icon type={detailsVisible ? "arrow_up" : "more"} color="icon-black" size={16} />} 
          iconOnly
          onClick={() => setDetailsVisible(prevState => !prevState)}
          className={entry.descriptions.length === 0 ? "opacity-0" : ""}
        />
      </div>
      <Flex hidden={!detailsVisible} direction="column" marginTop="xs" marginBottom="s">
        {entry.descriptions.map((description, i) =>
          <Flex direction="column" key={i}>
            <Text size="small" weight="bold">{description.title}</Text>
            <Text breakWords size="small" dangerouslySetInnerHTML={{
              __html: replaceTextWithLinks(description.text)
            }} />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}