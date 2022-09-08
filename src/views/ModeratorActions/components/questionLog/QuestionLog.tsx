import { useState, useReducer } from "react";
import { Flex, Headline, Spinner, Button, Icon } from "brainly-style-guide";

import locales from "@locales";
import BrainlyApi from "@brainly/index";
import type { GetQuestionLogResponse, QuestionLogEntry } from "@typings/brainly";

type QuestionLogState = {
  loading: boolean;
  error: Error;
  hidden: boolean;
  logEntries: {
    [x: string]: QuestionLogEntry[];
  };
  users: GetQuestionLogResponse["users_data"];
}


export default function QuestionLog(props: {
  taskId: number;
}) {
  /*const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {loading: true, data: null, something: ''}
  )

  const [logRequest, setLogRequest] = useState<QuestionLogState>({
    loading: true,
    error: null,
    hidden: !!JSON.parse(localStorage.getItem("questionLogHidden")),
    logEntries: {},
    users: []
  });

  const updateState = (_state: Partial<QuestionLogState>) =>
    setLogRequest(prevState => 
      ({ ..._state, ...prevState })
    );



  const toggleVisibility = () => {
    const hidden = !logRequest.hidden;

    this.setState({ hidden });
    localStorage.setItem("questionLogHidden", JSON.stringify(hidden));
  }
*/
  return (
    <div></div>
  );
}