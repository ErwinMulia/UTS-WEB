export function Newsletter() {
  return (
    <div className="py-12 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-2">Tetap Terinformasi</h2>
            <p className="mb-6">Dapatkan info terbaru tentang acara-acara terpopuler langsung ke email Anda</p>
            <div className="max-w-md mx-auto lg:mx-0 flex">
              <input
                type="email"
                placeholder="Alamat email Anda"
                className="flex-1 px-4 py-3 rounded-l-md text-gray-900 focus:outline-none border border-gray-300"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-r-md hover:bg-blue-700 transition border border-blue-600">
                Subscribe
              </button>
            </div>
          </div>

          <div className="lg:w-1/2">
            <h3 className="text-xl font-semibold mb-4 text-center lg:text-left">Apa kata mereka?</h3>
            <div className="space-y-6">
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="text-yellow-500 mr-2">
                    {"★".repeat(5)}
                  </div>
                  <span className="text-sm text-gray-600">5.0/5.0</span>
                </div>
                <p className="text-gray-800">
                  "Proses pemesanan tiketnya super cepat dan nggak ribet. E-tiket langsung masuk email, jadi gak perlu dicetak lagi!"
                </p>
                <span className="text-sm italic text-gray-500 block mt-2">– Andi, Jakarta</span>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="text-yellow-500 mr-2">
                    {"★".repeat(4) + "☆"}
                  </div>
                  <span className="text-sm text-gray-600">4.0/5.0</span>
                </div>
                <p className="text-gray-800">
                  "Sistemnya aman dan transparan. Saya bisa cek status tiket kapan aja. Sangat membantu, apalagi buat event-event besar."
                </p>
                <span className="text-sm italic text-gray-500 block mt-2">– Rina, Surabaya</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}