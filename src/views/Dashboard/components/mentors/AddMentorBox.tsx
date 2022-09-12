import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Input, Flex, Button } from "brainly-style-guide";

import locales from "@locales";
import _API from "@lib/api/extension";
import useStore from "../../store";

export default function AddMentorBox() {
  const [linkIsValid, setLinkIsValid] = useState<boolean>(null);
  const [mentorId, setMentorId] = useState<number>(null);
  const [error, setError] = useState<Error>(null);
  const [loading, setLoading] = useState(false);

  const store = useStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLinkIsValid(!isNaN(mentorId) && mentorId >= 1 && mentorId < Number.MAX_SAFE_INTEGER);
  }, [mentorId]);

  const addMentor = () => {
    setLoading(true);
    setError(null);

    _API.AddMentor({
      id: mentorId,
      senior: false
    })
      .then(mentor => {
        store.addMentor(mentor);

        if (inputRef.current) inputRef.current.value = "";
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let target = event.currentTarget;
    let mentorId = +target.value.match(/(?<=profil\/.+-)\d+/);

    setMentorId(mentorId);
  };

  return (
    <Flex fullWidth marginBottom="xs" marginTop="xs" className="add-mentor-box">
      <Input 
        fullWidth 
        size="s" 
        placeholder={locales.common.addMentor} 
        onChange={handleInputChange}
        invalid={linkIsValid === false || error !== null}
        valid={linkIsValid === true && error === null}
        disabled={loading}
        errorMessage={error?.message}
      />
      <Button 
        type="solid-inverted" 
        size="s" 
        disabled={!linkIsValid}
        onClick={addMentor}
        loading={loading}
      >OK</Button>
    </Flex>
  );
}