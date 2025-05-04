interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

const StepProgress = ({ currentStep, totalSteps }: StepProgressProps) => (
  <div className="w-full mb-8">
    <div className="h-2 bg-gray-200 rounded-full">
      <div
        className="h-2 bg-blue-500 rounded-full transition-all duration-300"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      />
    </div>
    <div className="mt-2 text-sm text-gray-600 text-center">
      Etapa {currentStep} de {totalSteps}
    </div>
  </div>
);

export default StepProgress;