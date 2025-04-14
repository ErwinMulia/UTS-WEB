import { CalendarIcon, MapPinIcon, ArrowRightIcon } from 'lucide-react';

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
            <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-48 object-cover" // Changed to object-contain to prevent cropping
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{event.title}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <CalendarIcon size={16} className="mr-2" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPinIcon size={16} className="mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-600">{event.price}</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition">
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