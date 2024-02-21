import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (count !== 0 && count % 5 === 0) {
      setIsDisabled(true);
      setTimeout(() => {
        setIsDisabled(false);
      }, 5000);
    }
  }, [count]);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleClick} disabled={isDisabled}>
        Click
      </button>
    </>
  );
}

export default App;
