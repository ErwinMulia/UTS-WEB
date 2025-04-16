import { FC } from 'react';
import { SearchIcon, TicketIcon, UserIcon } from 'lucide-react';

interface IconProps {
  type: 'search' | 'ticket' | 'user';
  size: number;
}

const IconMap = {
  search: <SearchIcon size={32} />,
  ticket: <TicketIcon size={32} />,
  user: <UserIcon size={32} />,
};

export const Icon: FC<IconProps> = ({ type, size }) => {
  return IconMap[type] || null;
};