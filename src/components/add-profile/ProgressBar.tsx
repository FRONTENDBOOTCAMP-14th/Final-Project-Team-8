interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="relative flex h-2 w-full items-center">
      <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-gray-200"></div>
      <div
        className="relative top-0 z-10 h-2 rounded-full bg-[#484280] transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
