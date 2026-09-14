import { createContext, useState } from "react";

export let CounterContext = createContext();

export function CounterContextProvider({ children }) {
  const [counter, setcounter] = useState(0);
  const [userName, setuserName] = useState('ahmed');

  return (
    <CounterContext.Provider value={{ counter, userName, setcounter, setuserName }}>
      {children}
    </CounterContext.Provider>
  );
}
