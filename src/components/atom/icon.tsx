import { CalendarIcon, MapPinIcon } from 'lucide-react';

interface IconProps {
  type: 'calendar' | 'mapPin';
  size: number;
}

export function Icon({ type, size }: IconProps) {
  const icons = {
    calendar: <CalendarIcon size={size} />,
    mapPin: <MapPinIcon size={size} />
  };

  return icons[type];
}
