export function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Tikets.com</h3>
              <p className="text-gray-400">Platform pemesanan tiket online terpercaya di Indonesia.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Kategori</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Konser</a></li>
                <li><a href="#" className="hover:text-white">Festival</a></li>
                <li><a href="#" className="hover:text-white">Seminar</a></li>
                <li><a href="#" className="hover:text-white">Olahraga</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Perusahaan</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-white">Karir</a></li>
                <li><a href="#" className="hover:text-white">Kontak</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Bantuan</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Syarat & Ketentuan</a></li>
                <li><a href="#" className="hover:text-white">Kebijakan Privasi</a></li>
                <li><a href="#" className="hover:text-white">Pusat Bantuan</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Tikets.com. Seluruh hak cipta dilindungi.</p>
          </div>
        </div>
      </footer>
    );
  }