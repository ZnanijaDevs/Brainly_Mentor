import { Flex, Headline, Spinner, Text } from "brainly-style-guide";
import { useRef, useEffect, useState } from "react";

import locales from "@locales";
import _API from "@lib/api/extension";

import useStore from "./store";
import CloseModalButton from "./components/common/CloseModalButton";
import TabLink from "./components/common/TabLink";
import MenteesList from "./components/mentees/MenteesList";
import MentorsList from "./components/mentors/MentorsList";
import ErrorFallback from "./ErrorFallback";
import AddMenteeBox from "./components/mentors/AddMentorBox";

export default function Modal() {
  const { isSeniorMentor, mentor, setMentor } = useStore();
  const modalElement = useRef<HTMLDivElement>(null);

  const [currentTab, setCurrentTab] = useState<"mentees" | "mentors">("mentees");
  const [error, setError] = useState<Error>(null);

  const fetchMe = () => {
    setError(null);

    _API.GetMe()
      .then(mentor => setMentor(mentor))
      .catch(err => setError(err));
  };

  const closeModal = () => {
    modalElement?.current?.parentElement.parentElement.click();
  };

  useEffect(() => fetchMe(), []);

  if (error) return <ErrorFallback error={error} onTryAgain={fetchMe} />;
  if (!mentor) return <Spinner />;

  return (
    <div ref={modalElement}>
      <Flex justifyContent="space-between" fullWidth>
        <Headline extraBold>
          <TabLink 
            title={locales.common.mentees} 
            onChoose={() => setCurrentTab("mentees")}
            active={currentTab === "mentees"}
          />
          {isSeniorMentor && <>
            <Text inherited color="text-gray-70"> / </Text>
            <TabLink 
              title={locales.common.mentors} 
              onChoose={() => setCurrentTab("mentors")}
              active={currentTab === "mentors"}
            />
          </>}
        </Headline>
        <CloseModalButton onClick={closeModal} />
      </Flex>
      {currentTab === "mentees" ? 
        <MenteesList /> : 
        <>
          <AddMenteeBox />
          <MentorsList />
        </>
      }
    </div>
  );
}