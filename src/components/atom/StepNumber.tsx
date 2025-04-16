type StepNumberProps = {
  number: number;
  className?: string;
};

export const StepNumber = ({ number, className = '' }: StepNumberProps) => (
  <span className={`text-sm text-blue-500 mb-2 block font-semibold ${className}`}>
    Langkah {number}
  </span>
);