import React, { useState } from "react";

const Stepper = ({ stepsConfig = [] }) => {
  const [currentStep, setCurrentStep] = useState(2);
  const [isComplete, setIsComplete] = useState(false);

  if (!stepsConfig.length) {
    return <></>;
  }

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === stepsConfig.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };

  const ActiveComponent = stepsConfig[currentStep - 1].Component;

  return (
    <>
      <div className="stepper">
        {stepsConfig.map((steps, index) => {
          return (
            <div
              className={`step ${
                currentStep > index + 1 || isComplete ? "complete" : ""
              }
            ${currentStep === index + 1 ? "active" : ""} `}
              key={steps.name}>
              <div className="step-number">
                {currentStep > index + 1 || isComplete ? (
                  <span>&#10003;</span>
                ) : (
                  index + 1
                )}
              </div>
              <div className="step-name"> {steps.name}</div>
            </div>
          );
        })}

        <div className="progress-bar">
          <div className="progress"></div>
        </div>
      </div>

      <ActiveComponent />

      {!isComplete && (
        <button className="btn" onClick={handleNext}>
          {currentStep === stepsConfig.length ? "Finish" : "Next"}
        </button>
      )}
    </>
  );
};

export default Stepper;
