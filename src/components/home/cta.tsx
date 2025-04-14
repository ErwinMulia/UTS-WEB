export function Newsletter() {
    return (
      <div className="py-12 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Tetap Terinformasi</h2>
          <p className="mb-6">Dapatkan info terbaru tentang acara-acara terpopuler langsung ke email Anda</p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Alamat email Anda"
              className="flex-1 px-4 py-3 rounded-l-md text-gray-50 focus:outline-none border border-gray-100"
            />
            <button className="bg-blue-800 px-6 py-3 rounded-r-md hover:bg-blue-700 transition border border-gray-100">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    );
  }
  