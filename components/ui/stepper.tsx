import React from "react";

interface StepProps {
  title: string;
  isActive?: boolean;
  isCompleted?: boolean;
}

export const Step: React.FC<StepProps> = ({ title, isActive, isCompleted }) => {
  return (
    <div
      className={`flex items-center ${
        isActive ? "text-primary" : "text-gray-500"
      }`}
    >
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
          isActive ? "border-primary" : "border-gray-300"
        } ${isCompleted ? "bg-primary text-white" : ""}`}
      >
        {isCompleted ? "✓" : ""}
      </div>
      <span className="ml-2">{title}</span>
    </div>
  );
};

interface StepperProps {
  activeStep: number;
  children: React.ReactElement<StepProps>[];
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  activeStep,
  children,
  className,
}) => {
  return (
    <div className={`flex justify-between ${className}`}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<StepProps>(child)) {
          return React.cloneElement(child, {
            isActive: index === activeStep,
            isCompleted: index < activeStep,
          });
        }
        return child;
      })}
    </div>
  );
};
