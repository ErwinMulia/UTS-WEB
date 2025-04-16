import { LinkListMolecule } from '@/components/molecul/LinkListMolecule';
import { SocialMediaMolecule } from '@/components/molecul/SocialMediaMolecule';
import { TextAtom } from '@/components/atom/TextAtom';

export function FooterSectionOrganism() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Tikets.com</h3>
            <TextAtom text="Platform pemesanan tiket online terpercaya di Indonesia." />
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Kategori</h3>
            <LinkListMolecule
              links={[
                { href: '#', text: 'Konser' },
                { href: '#', text: 'Festival' },
                { href: '#', text: 'Seminar' },
                { href: '#', text: 'Olahraga' },
              ]}
            />
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Perusahaan</h3>
            <LinkListMolecule
              links={[
                { href: '#', text: 'Tentang Kami' },
                { href: '#', text: 'Karir' },
                { href: '#', text: 'Kontak' },
                { href: '#', text: 'Blog' },
              ]}
            />
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Bantuan</h3>
            <LinkListMolecule
              links={[
                { href: '#', text: 'FAQ' },
                { href: '#', text: 'Syarat & Ketentuan' },
                { href: '#', text: 'Kebijakan Privasi' },
                { href: '#', text: 'Pusat Bantuan' },
              ]}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-gray-400">
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Ikuti Kami</h3>
            <SocialMediaMolecule />
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Hubungi Kami</h3>
            <div className="space-y-2">
              <TextAtom text="📍 Jl. Tukad Badung No. 193, Denpasar-Bali" />
              <TextAtom text="📞 (+62) 823456970" />
              <TextAtom text="✉️ support@tikets.com" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Didukung Oleh</h3>
            <div className="flex space-x-4 items-center">
              <img src="/image/DANA.jpg" alt="DANA" className="h-8" />
              <img src="/image/OVO.png" alt="OVO" className="h-8" />
              <img src="/image/GOPAY.png" alt="GOPAY" className="h-8" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <TextAtom text={`© ${new Date().getFullYear()} Tikets.com. Seluruh hak cipta dilindungi.`} />
        </div>
      </div>
    </footer>
  );
}