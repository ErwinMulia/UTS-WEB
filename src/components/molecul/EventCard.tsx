import { Text } from '../atom/Text';
import { Icon } from '../atom/Icon';
import { Button } from '../atom/Button';
import { Image } from '../atom/Image';

interface Event {
  title: string;
  date: string;
  location: string;
  price: string;
  image: string;
}

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
      <Image src={event.image} alt={event.title} />
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{event.title}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <Icon type="calendar" size={16} />
          <Text>{event.date}</Text>
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <Icon type="mapPin" size={16} />
          <Text>{event.location}</Text>
        </div>
        <div className="flex justify-between items-center">
          <Text className="font-bold text-blue-600">{event.price}</Text>
          <Button label="Pesan Tiket" />
        </div>
      </div>
    </div>
  );
}