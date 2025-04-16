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
    <div className="py-8 bg-gray-50"> {/* Reduced padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6"> {/* Reduced margin-bottom */}
          <h2 className="text-xl font-bold text-gray-800">Acara Populer</h2> {/* Smaller font size */}
          <a href="#" className="text-blue-600 flex items-center font-medium hover:underline">
            Lihat Semua <ArrowRightIcon size={16} className="ml-1" />
          </a>
        </div>

        {/* Grid Layout for Featured Events */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> {/* Reduced gap */}
          {featuredEvents.map((event) => (
            <div key={event.id} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>
              <div className="flex flex-col justify-between p-3 flex-1"> {/* Reduced padding */}
                <h3 className="text-sm font-semibold text-gray-800">{event.title}</h3> {/* Smaller text size */}
                <p className="text-xs text-gray-600">{event.date}</p> {/* Smaller text size */}
                <p className="text-xs text-gray-600">{event.location}</p> {/* Smaller text size */}
                <div className="flex justify-between items-center mt-3"> {/* Reduced margin-top */}
                  <p className="text-sm font-bold text-blue-600">{event.price}</p> {/* Slightly smaller text */}
                  <button className="bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 text-xs">
                    Pesan Tiket
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}