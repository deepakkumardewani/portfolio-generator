"use client";

import { useState } from "react";

import InfoForm from "./InfoForm";
import SkillsForm from "./SkillsForm";
import ExperienceForm from "./ExperienceForm";
import ProjectsForm from "./ProjectsForm";
import ContactForm from "./ContactForm";
// import LinkedInImportButton from "./LinkedInImportButton";

// Define component types
type StepComponent = {
  name: string;
  type: "start" | "middle" | "end";
  component: React.ComponentType<any>;
};

const STEPS: StepComponent[] = [
  {
    name: "Personal Info",
    type: "start",
    component: InfoForm,
  },
  {
    name: "Skills",
    type: "middle",
    component: SkillsForm,
  },
  {
    name: "Experience",
    type: "middle",
    component: ExperienceForm,
  },
  {
    name: "Projects",
    type: "middle",
    component: ProjectsForm,
  },
  {
    name: "Contact",
    type: "end",
    component: ContactForm,
  },
] as const;

export default function FormStepper() {
  const [currentStep, setCurrentStep] = useState(0);

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const goToPrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  // Render the appropriate component based on step type
  const renderCurrentStep = () => {
    const { component: CurrentStepComponent, type } = STEPS[currentStep];

    switch (type) {
      case "start":
        return <CurrentStepComponent onNext={goToNextStep} />;
      case "end":
        return <CurrentStepComponent onBack={goToPrevStep} />;
      case "middle":
        return (
          <CurrentStepComponent onNext={goToNextStep} onBack={goToPrevStep} />
        );
    }
  };

  return (
    <div className="container max-w-4xl py-12">
      {/* LinkedIn Import Banner */}
      {/* <div className="mb-8 p-4 bg-stone-50 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100">
              Quick Import
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Save time by importing your profile from LinkedIn
            </p>
          </div>
          <LinkedInImportButton />
        </div>
      </div> */}

      {/* Progress Header */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
            {STEPS[currentStep].name}
          </h2>
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1}/{STEPS.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-muted dark:bg-neutral-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 ease-in-out"
            style={{
              width: `${((currentStep + 1) / STEPS.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Form Steps */}
      <div className="form-step-container">{renderCurrentStep()}</div>
    </div>
  );
}
