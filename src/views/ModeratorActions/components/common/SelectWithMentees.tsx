import { ChangeEvent, useEffect, useState } from "react";
import { Select } from "brainly-style-guide";

import GetMyMentees, { MyMenteeDataType } from "@lib/GetMyMentees";
import flash from "@utils/flashes";
import getUserId from "../../getUserId";

export default function SelectWithMentees() {
  const [mentees, setMentees] = useState<MyMenteeDataType[]>(null);

  useEffect(() => {
    GetMyMentees()
      .then(data => setMentees(data))
      .catch(err => flash("default", err.message));
  }, []);

  if (!mentees) return;

  return (
    <Select
      options={mentees.map(mentee =>
        ({ text: mentee.nick, value: mentee.id.toString() })
      )}
      size="s"
      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
        window.location.href = `/moderation_new/view_moderator/${e.currentTarget.value}`;
      }}
      defaultValue={getUserId()}
    />
  );
}