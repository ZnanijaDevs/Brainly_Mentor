import { useState, useEffect } from "react";
import { Flex, Headline, Spinner, Button, Icon } from "brainly-style-guide";

import locales from "@locales";
import type { QuestionLogEntriesByDateDataType } from "@typings/responses";
import _API from "@lib/api/extension";
import EntriesSection from "./EntriesSection";

export default function QuestionLog(props: {
  taskId: number;
}) {
  const [logEntries, setLogEntries] = useState<QuestionLogEntriesByDateDataType>(null);
  const [hidden, setHidden] = useState(
    !!JSON.parse(localStorage.getItem("questionLogHidden"))
  );

  useEffect(() => {
    _API.GetQuestionLog(props.taskId)
      .then(data => setLogEntries(data));
  }, []);

  const toggleVisibility = () => {
    setHidden(prevState => !prevState);
    localStorage.setItem("questionLogHidden", JSON.stringify(!hidden));
  };

  return (<>
    <Flex className="question-log" fullHeight data-log-hidden={hidden}>
      {logEntries === null ? <Spinner size="xsmall" /> : <>
        <Flex alignItems="center" className="question-log-header">
          <Button onClick={toggleVisibility} variant="outline" iconOnly icon={<Icon type="arrow_left" color="adaptive" size={24} />} />
          <Headline type="h2" size="medium" extraBold color="text-gray-70">
            {locales.common.questionLog}
          </Headline>
        </Flex>
        <Flex direction="column" className="question-log-list" fullHeight>
          {Object.keys(logEntries).map((entryDate, i) =>
            <EntriesSection key={i} date={entryDate} entries={logEntries[entryDate]} />
          )}
        </Flex>
      </>}
    </Flex>
    <Flex onClick={toggleVisibility} alignItems="center" direction="column" className="open-question-log" hidden={!hidden}>
      <Headline transform="uppercase">{locales.common.questionLog}</Headline>
      <Icon type="arrow_right" color="adaptive" size={24} />
    </Flex>
  </>);
}