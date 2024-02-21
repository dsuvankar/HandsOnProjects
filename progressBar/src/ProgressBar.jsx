import React, { useEffect, useState } from "react";

const ProgressBar = ({ value = 0 }) => {
  const [percent, setPercent] = useState(value);

  useEffect(() => {
    setPercent(Math.min(100, Math.max(0, value)));
  }, [value]);

  return (
    <div className="progressBar">
      <span style={{ color: percent > 55 ? "white" : "black" }}>
        {percent.toFixed()}
      </span>
      <div style={{ width: `${percent}%` }}></div>
    </div>
  );
};

export default ProgressBar;
