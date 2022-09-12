import createStore from "zustand";
import type { Mentor } from "@typings";
import type { MyMenteeDataType } from "@lib/GetMyMentees";

interface AppState {
  mentors: Mentor[];
  myMentees: MyMenteeDataType[];
  isSeniorMentor: boolean;
  mentor: Mentor;
  setMentor: (mentor: Mentor) => void;
  setMyMentees: (mentees: MyMenteeDataType[]) => void;
  setMentors: (mentors: Mentor[]) => void;
  removeMentor: (id: number) => void;
  addMentor: (mentor: Mentor) => void;
  updateMentor: (mentor: Mentor) => void;
}

const useStore = createStore<AppState>((set) => ({
  mentors: null,
  myMentees: null,
  mentor: null,
  isSeniorMentor: null,
  setMentor: (mentor: Mentor) => set(() => ({ 
    mentor,
    isSeniorMentor: mentor.senior
  })),
  setMyMentees: (mentees: MyMenteeDataType[]) => set(() => ({ myMentees: mentees })),
  setMentors: (mentors: Mentor[]) => set(() => ({ 
    mentors: mentors 
  })),
  removeMentor: (id: number) => set(prevState => {
    let mentors = prevState.mentors;

    let newMentors = mentors.filter(x => x.id !== id);
    return { mentors: newMentors };
  }),
  addMentor: (mentor: Mentor) => set(prevState => {
    return { mentors: [...prevState.mentors, mentor] };
  }),
  updateMentor: (updatedMentor: Mentor) => set(prevState => {
    let allMentors = prevState.mentors;
    let thisMentorIndex = allMentors.findIndex(x => x.id === updatedMentor.id);

    allMentors[thisMentorIndex] = updatedMentor;

    return { mentors: allMentors };
  })
}));

export default useStore;