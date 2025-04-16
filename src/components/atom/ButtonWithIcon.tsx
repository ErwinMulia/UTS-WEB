import { IconType } from "react-icons";

interface ButtonWithIconProps {
  icon: IconType;
  text: string;
  className?: string;
  onClick?: () => void;
}

export function ButtonWithIcon({ icon: Icon, text, className = "", onClick }: ButtonWithIconProps) {
  return (
    <button 
      className={`flex items-center gap-2 px-6 py-3 font-medium rounded-md transition ${className}`}
      onClick={onClick}
    >
      <Icon />
      {text}
    </button>
  );
}