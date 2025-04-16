export function TextAtom({ text, className = '' }: { text: string, className?: string }) {
    return <p className={`text-gray-400 ${className}`}>{text}</p>;
  }  