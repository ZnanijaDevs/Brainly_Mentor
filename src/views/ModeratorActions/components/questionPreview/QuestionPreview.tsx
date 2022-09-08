import { createPortal } from "react-dom";
import { Button, Icon } from "brainly-style-guide";

import QuestionLog from "../questionLog/QuestionLog";

export default function QuestionPreview(props: {
  id: number;
  onClose: () => void;
}) {
  const modalRoot = document.getElementById("question-preview-modal-container");

  // TODO: question preview
  return createPortal(
    <div className="overlay">
      <div className="overlay-container">
        <Button
          icon={<Icon color="icon-black" size={24} type="close" />}
          iconOnly
          type="solid-light"
          onClick={props.onClose}
          className="close-modal-button"
        />
      </div>
      {<QuestionLog taskId={props.id} />}
    </div>,
    modalRoot
  );
}