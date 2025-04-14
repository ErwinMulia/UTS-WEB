import { TicketIcon, MapPinIcon, UserIcon, CalendarIcon } from 'lucide-react';

export function Categories() {
  const categories = [
    { name: 'Konser', icon: <TicketIcon size={24} /> },
    { name: 'Festival', icon: <MapPinIcon size={24} /> },
    { name: 'Seminar', icon: <UserIcon size={24} /> },
    { name: 'Olahraga', icon: <CalendarIcon size={24} /> },
  ];
  
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Jelajahi Kategori</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition cursor-pointer">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full text-blue-600 mb-4">
                {category.icon}
              </div>
              <h3 className="font-medium text-gray-800">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}