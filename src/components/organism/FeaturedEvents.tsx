import { ArrowRightIcon } from 'lucide-react';
import { EventCard } from '../molecul/EventCard';

export function FeaturedEvents() {
  const featuredEvents = [
    {
      id: 1,
      title: 'Konser Musik Pop',
      date: '25 April 2025',
      location: 'Gelora Bung Karno - Jakarta',
      image: './image/coldplay-tugas.jpeg',
      price: 'Rp 1.500.000'
    },
    {
      id: 2,
      title: 'Festival Kuliner Nusantara',
      date: '10 Mei 2025',
      location: 'West Atrium Living World',
      image: './image/festivalkuliner.jpeg',
      price: 'Rp 150.000'
    },
    {
      id: 3,
      title: 'Seminar Digital Marketing',
      date: '15 Mei 2025',
      location: 'Aula Stim Sukma',
      image: './image/seminardigital.jpeg',
      price: 'Rp 300.000'
    },
    {
      id: 4,
      title: 'Lomba Jaringan & Poster',
      date: '05 Desember 2025',
      location: 'Aula Primakara',
      image: './image/lombajaringan.png',
      price: 'Rp 100.000'
    },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Acara Populer</h2>
          <a href="#" className="text-blue-600 flex items-center font-medium hover:underline">
            Lihat Semua <ArrowRightIcon size={16} className="ml-1" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}