type CategoryButtonProps = {
    label: string;
    isActive: boolean;
    onClick: () => void;
  };
  
  export default function CategoryButton({ label, isActive, onClick }: CategoryButtonProps) {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full border text-sm font-medium ${
          isActive ? "bg-blue-600 text-white" : "bg-white text-gray-700"
        } hover:bg-blue-100 transition`}
      >
        {label}
      </button>
    );
  }  