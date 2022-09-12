import { useEffect } from "react";
import { Spinner } from "brainly-style-guide";

import GetMyMentees from "@lib/GetMyMentees";
import GridList from "../common/GridList";
import MenteeBox from "./MenteeBox";
import useStore from "../../store";

export default function MenteesList() {
  const { myMentees, setMyMentees } = useStore();

  useEffect(() => {
    GetMyMentees().then(data => setMyMentees(data));
  }, []);

  if (!myMentees) return <Spinner />;

  return (
    <GridList 
      withMargin 
      elements={myMentees.map(mentee => <MenteeBox key={mentee.id} mentee={mentee} />)} 
    />
  );
}