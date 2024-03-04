import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import Select from "./Select";
import "./App.css";

type Transition = {
  id: string;
  stepId: number;
  intent: string;
};

export type Option = {
  value: string;
  label: string;
};

const options: Option[] = [
  { value: "intent_error", label: "Intent error" },
  { value: "question_answered", label: "Question answered" },
  { value: "intent_timeout", label: "Intent timeout" },
  { value: "intent_exit", label: "Intent exit" },
];

const stepsOptions: Option[] = [
  { value: "1", label: "Step 1" },
  { value: "2", label: "Step 2" },
  { value: "3", label: "Step 3" },
  { value: "4", label: "Step 4" },
];

const defaultTransitions = [
  { id: uuidv4(), stepId: 1, intent: "intent_error" },
  { id: uuidv4(), stepId: 2, intent: "question_answered" },
  { id: uuidv4(), stepId: 3, intent: "intent_timeout" },
  { id: uuidv4(), stepId: 4, intent: "intent_exit" },
];

function App() {
  const [transitions, setTransitions] = React.useState<Transition[]>(defaultTransitions);

  const handleAddTransition = () => {
    const id = uuidv4();
    setTransitions([...transitions, { id, stepId: -1, intent: "" }]);
  };

  const handleTransitionChange = (event: React.ChangeEvent<HTMLSelectElement>, transitionId: number) => {
    const { value } = event.target;
    const newTransitions = transitions.map((transition, idx) => {
      if (idx === transitionId) {
        return { ...transition, intent: value };
      }
      return transition;
    });
    setTransitions(newTransitions);
  };

  const handleStepChange = (event: React.ChangeEvent<HTMLSelectElement>, transitionId: number) => {
    const { value } = event.target;
    const newTransitions = transitions.map((transition, idx) => {
      if (idx === transitionId) {
        return { ...transition, stepId: parseInt(value) };
      }
      return transition;
    });
    setTransitions(newTransitions);
  };

  const handleDeleteTransition = (transitionId: number) => {
    const newTransitions = transitions.filter((_, idx) => idx !== transitionId);
    setTransitions(newTransitions);
  };

  return (
    <section>
      <pre>
        <code>{JSON.stringify(transitions)}</code>
      </pre>
      <h1>Multi select</h1>
      <button onClick={handleAddTransition}>Add transition</button>
      <ul>
        {transitions.map((transition, idx) => (
          <li key={transition.id}>
            <Select
              placeholder="Select an intent"
              transitionId={idx}
              options={options}
              value={transition.intent}
              onChange={handleTransitionChange}
            />
            <Select
              placeholder="Select a step id"
              transitionId={idx}
              options={stepsOptions}
              value={transition.stepId.toString()}
              onChange={handleStepChange}
            />
            <button onClick={() => handleDeleteTransition(idx)}>Delete {idx}</button>
          </li>
        ))}
      </ul>
      {transitions.length > 0 && <button onClick={() => console.log(transitions)}>Save</button>}
    </section>
  );
}

export default App;
