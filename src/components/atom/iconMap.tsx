import { FC } from 'react';
import { SearchIcon, TicketIcon, UserIcon } from 'lucide-react';

interface IconProps {
  type: 'search' | 'ticket' | 'user';
  size: number;
}

export const iconMap = {
  search: <SearchIcon size={32} />,
  ticket: <TicketIcon size={32} />,
  user: <UserIcon size={32} />,
};

export const Icon: FC<IconProps> = ({ type, size }) => {
  return iconMap[type] || null;
};