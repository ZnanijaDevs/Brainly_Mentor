import { useState } from "react";
import { Flex, Text, Button, Icon } from "brainly-style-guide";

import type { QuestionLogEntry } from "@typings";
import LogEntry from "./LogEntry";

export default function EntriesSection(props: {
  entries: QuestionLogEntry[];
  date: string;
}) {
  const [visible, setVisible] = useState(true);

  return (
    <Flex direction="column" fullWidth marginBottom="xs">
      <Flex alignItems="center">
        <Text weight="bold" size="small">{props.date}</Text>
        <Button 
          variant="solid-light" 
          iconOnly 
          size="s" 
          icon={<Icon type={visible ? "arrow_up" : "arrow_down"} size={16} />}
          onClick={() => setVisible(prevState => !prevState)}
        />
      </Flex>
      <Flex direction="column" hidden={!visible}>
        {props.entries.map((logEntry, i) => 
          <LogEntry key={i} entry={logEntry} />)
        }
      </Flex>
    </Flex>
  );
}