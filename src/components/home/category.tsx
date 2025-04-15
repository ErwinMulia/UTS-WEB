import { TicketIcon, MapPinIcon, UserIcon, CalendarIcon } from 'lucide-react';

export function Categories() {
  const categories = [
    { name: 'Konser', icon: <TicketIcon size={28} /> },
    { name: 'Festival', icon: <MapPinIcon size={28} /> },
    { name: 'Seminar', icon: <UserIcon size={28} /> },
    { name: 'Olahraga', icon: <CalendarIcon size={28} /> },
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-10 text-center text-gray-800">Jelajahi Kategori</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center border shadow-sm hover:shadow-lg transition duration-300 transform hover:-translate-y-1 cursor-pointer group"
            >
              <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full text-blue-600 mb-4 transition-all duration-300 group-hover:scale-110">
                {category.icon}
              </div>
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}