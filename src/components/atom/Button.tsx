interface ButtonProps {
    label: string;
    onClick: () => void;
  }
  
  export function Button({ label, onClick }: ButtonProps) {
    return (
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 active:scale-95 transition"
        onClick={onClick}
      >
        {label}
      </button>
    );
  }  