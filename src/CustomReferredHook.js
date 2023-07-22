import { useState, useRef } from "react";

// Very interesting reason for this hook creation
// I was in exact same issue
// Read about issue: https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
// Read about issue: https://stackoverflow.com/questions/55265255/react-usestate-hook-event-handler-using-initial-state
export default function useReferredState(initialValue) {
  const [state, setState] = useState(initialValue);
  const reference = useRef(state);

  const setReferredState = value => {
      reference.current = value;
      setState(value);
  };

  return [reference, setReferredState];
}
