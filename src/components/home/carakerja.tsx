import { SearchIcon, TicketIcon, UserIcon } from 'lucide-react';

export function HowItWorks() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Cara Kerja</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full text-blue-600 mb-4 w-16 h-16">
              <SearchIcon size={32} />
            </div>
            <h3 className="text-xl text-blue-800 font-semibold mb-2">
              <strong>Cari Acara</strong>
            </h3>
            <p className="text-gray-600">Temukan berbagai acara menarik dari berbagai kategori sesuai minat Anda.</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full text-blue-600 mb-4 w-16 h-16">
              <TicketIcon size={32} />
            </div>
            <h3 className="text-xl text-blue-800 font-semibold mb-2">
              <strong>Pesan Tiket</strong>
            </h3>
            <p className="text-gray-600">Pilih tiket dan lakukan pembayaran dengan cepat dan aman menggunakan berbagai metode.</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full text-blue-600 mb-4 w-16 h-16">
              <UserIcon size={32} />
            </div>
            <h3 className="text-xl text-blue-800 font-semibold mb-2">
              <strong>Nikmati Acara</strong>
            </h3>
            <p className="text-gray-600">Dapatkan e-tiket secara instan dan siap untuk dinikmati di acara.</p>
          </div>
        </div>
      </div>
    </div>
  );
}