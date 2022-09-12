import { useState } from "react";
import { Button, Icon, Checkbox, Avatar, Link } from "brainly-style-guide";

import type { Mentor } from "@typings";
import locales from "@locales";
import _API from "@lib/api/extension";

import useStore from "../../store";
import MentorBoxError from "./MentorBoxError";

export default function MentorBox(props: {
  mentor: Mentor;
}) {
  const { mentor } = props;
  const store = useStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>(null);

  const updateStateBeforeRequest = () => {
    setLoading(true);
    setError(null);
  };

  const deleteMentor = () => {
    // eslint-disable-next-line no-alert
    if (!confirm(locales.common.areYouSureToDeleteMentor)) return;

    updateStateBeforeRequest();

    _API.RemoveMentor(mentor.id)
      .then(() => store.removeMentor(mentor.id))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  };

  const updateMentor = (senior: boolean) => {
    updateStateBeforeRequest();

    _API.UpdateMentor(mentor.id, { senior })
      .then(mentor => store.updateMentor(mentor))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  };

  const isDisabled = store.mentor.id === mentor.id || loading;

  return (
    <div className="mentor-box">
      <div>
        <Avatar size="s" imgSrc={mentor.avatar} />
        <Link target="_blank" href={`/users/redirect_user/${mentor.id}`} weight="bold" breakWords>
          {mentor.nick}
        </Link>
        <Checkbox 
          defaultChecked={mentor.senior} 
          labelSize="small" 
          disabled={isDisabled}
          onChange={e => updateMentor(e.currentTarget.checked)}
        >
          {locales.common.senior}
        </Checkbox>
        <Button
          icon={<Icon color="adaptive" size={16} type="trash" />}
          iconOnly
          size="s"
          toggle="red"
          type="outline"
          onClick={deleteMentor}
          disabled={isDisabled}
        />
      </div>
      {error && <MentorBoxError error={error} />}
    </div>
  );
}