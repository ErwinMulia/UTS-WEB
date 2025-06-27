// src/components/atom/EmptyStateAtom.tsx
import { FaTicketAlt } from 'react-icons/fa';

interface Props {
  icon?: 'ticket'; // Bisa dikembangkan untuk icon lain
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}

export const EmptyStateAtom = ({ icon, title, description, buttonText, onButtonClick }: Props) => (
  <div className="bg-white rounded-lg shadow p-8 text-center">
    {icon === 'ticket' && <FaTicketAlt className="mx-auto text-gray-300" size={48} />}
    <h3 className="mt-4 text-lg font-medium">{title}</h3>
    <p className="mt-2 text-gray-500">{description}</p>
    <button
      onClick={onButtonClick}
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
    >
      {buttonText}
    </button>
  </div>
);