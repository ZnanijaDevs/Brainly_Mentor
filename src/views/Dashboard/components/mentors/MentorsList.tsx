import { useEffect } from "react";
import { Spinner } from "brainly-style-guide";

import _API from "@lib/api/extension";

import GridList from "../common/GridList";
import MentorBox from "./MentorBox";
import useStore from "../../store";

export default function MentorsList() {
  const { mentors, setMentors } = useStore();

  useEffect(() => {
    _API.GetMentors().then(mentors => setMentors(mentors));
  }, []);

  if (!mentors) return <Spinner />;

  return (
    <GridList 
      withMargin 
      elements={mentors.map(mentor => <MentorBox key={mentor._id} mentor={mentor} />)} 
    />
  );
}