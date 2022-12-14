import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button, Icon, Flex, Link, Text, Spinner } from "brainly-style-guide";

import locales from "@locales";
import _API from "@lib/api/extension";
import flash from "@utils/flashes";
import type { BrainlyQuestion } from "@typings";

import QuestionLog from "../questionLog/QuestionLog";
import QuestionPreviewNode from "./QuestionPreviewNode";

export default function QuestionPreview(props: {
  id: number;
  onClose: () => void;
}) {
  const modalRoot = document.getElementById("question-preview-modal-container");

  const [question, setQuestion] = useState<BrainlyQuestion>(null);
  const [error, setError] = useState<Error>(null);

  useEffect(() => {
    _API.GetQuestion(props.id)
      .then(data => setQuestion(data))
      .catch(err => setError(err));
  }, []);

  if (error) {
    flash("error", error.message);
    props.onClose();
    return;
  }

  return createPortal(
    <div className="overlay">
      <div className="overlay-container">
        {!question ? <Spinner /> : <Flex direction="column" fullHeight>
          <Flex fullWidth justifyContent="space-between"className="question-preview-header">
            <Flex fullWidth alignItems="center">
              <Link color="text-black" target="_blank" href={`/task/${question.id}`}>
                {locales.common.question}
              </Link>
              <Text color="text-gray-70" size="small">
                <b>{question.subject} </b> 
                • {question.points} {locales.common.pts}
              </Text>
            </Flex>
            <Button className="close-modal-button" onClick={props.onClose} variant="transparent" iconOnly icon={<Icon color="icon-black" type="close" />} />
          </Flex>
          <Flex direction="column">
            {[
              question, ...question.answers
            ].map(node =>
              <QuestionPreviewNode node={node} key={`node-${node.id}-${node.created}`} />
            )}
          </Flex>
        </Flex>}
      </div>
      {<QuestionLog taskId={props.id} />}
    </div>,
    modalRoot
  );
}