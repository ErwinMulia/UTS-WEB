import { SearchIcon, TicketIcon, UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <SearchIcon size={32} />,
    title: 'Cari Acara',
    desc: 'Temukan berbagai acara menarik dari berbagai kategori sesuai minat Anda.'
  },
  {
    icon: <TicketIcon size={32} />,
    title: 'Pesan Tiket',
    desc: 'Pilih tiket dan lakukan pembayaran dengan cepat dan aman menggunakan berbagai metode.'
  },
  {
    icon: <UserIcon size={32} />,
    title: 'Nikmati Acara',
    desc: 'Dapatkan e-tiket secara instan dan siap untuk dinikmati di acara.'
  }
];

export function HowItWorks() {
  return (
    <div className="py-16 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-bold mb-12 text-center text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Cara Kerja
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="text-center bg-white text-blue-700 rounded-2xl p-6 transition transform hover:-translate-y-1 hover:shadow-xl group shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-sm text-blue-500 mb-2 block font-semibold">Langkah {i + 1}</span>
              <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full text-blue-600 mb-4 w-16 h-16 transition-transform duration-300 group-hover:scale-110 mx-auto">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}