import { useState } from 'react';

export interface Step {
  id: string;
  message: string;
}

const useSteps = (steps: Step[]) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((s) => (s + 1 >= steps.length ? 0 : s + 1));
    return steps[activeStep];
  };

  const handleBack = () => {
    setActiveStep((s) => (s - 1 < 0 ? steps.length - 1 : s - 1));
    return steps[activeStep];
  };

  const step = { ...steps[activeStep], index: activeStep };

  return [step, { handleNext, handleBack }] as const;
};

export default useSteps;
