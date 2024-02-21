import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

import "./App.css";

function App() {
  const [value, setValue] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setValue((val) => {
          const nextVal = val + 0.5;
          if (nextVal >= 100) {
            clearInterval(interval);
            return 100;
          }
          return nextVal;
        });
      }, 20);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return (
    <>
      <h1>Progress Bar</h1>
      <ProgressBar value={value} />
      {value === 100 ? (
        <button
          onClick={() => {
            setValue(0);
            setIsRunning(true);
          }}>
          Restart
        </button>
      ) : (
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Stop" : "Resume"}
        </button>
      )}
    </>
  );
}

export default App;
