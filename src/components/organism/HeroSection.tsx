import { FaSearch } from "react-icons/fa";

export function HeroSection() {
  return (
    <div className="relative bg-blue-600 text-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Left Section */}
          <div>
            <h1 className="text-4xl font-bold mb-4">Temukan dan Pesan Tiket Acara Favorit Anda</h1>
            <p className="text-lg mb-6">Temukan konser, festival, seminar, dan berbagai acara menarik lainnya di seluruh Indonesia dengan mudah dan aman.</p>
            
            {/* Stats Section */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center">
                <div className="text-3xl font-bold mr-2">50K+</div>
                <div className="text-sm">Review<br />Pelanggan</div>
              </div>
              <div className="flex items-center">
                <div className="text-3xl font-bold mr-2">500+</div>
                <div className="text-sm">Partner<br />Kerjasama</div>
              </div>
              <div className="flex items-center">
                <div className="text-3xl font-bold mr-2">10K+</div>
                <div className="text-sm">Acara<br />Tersedia</div>
              </div>
            </div>

            {/* CTA Button with Icon */}
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-100 transition shadow-lg">
              <FaSearch />
              Jelajahi Acara
            </button>
          </div>

          {/* Right Section with Visual Enhancement */}
          <div className="flex justify-center relative">
            <div className="relative w-full max-w-md">
              <img 
                src="/image/LOGOTIKETS1.svg" 
                alt="Event Tickets" 
                className="rounded-lg w-full h-auto object-contain drop-shadow-2xl"
              />
              {/* Decorative glowing blob */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-20 rounded-full filter blur-3xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}