// src/components/organisms/HowItWorks.tsx
import { FC } from 'react';
import { Step } from '@/component/molecule/Step';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: 'search',
    title: 'Cari Acara',
    desc: 'Temukan berbagai acara menarik dari berbagai kategori sesuai minat Anda.',
  },
  {
    icon: 'ticket',
    title: 'Pesan Tiket',
    desc: 'Pilih tiket dan lakukan pembayaran dengan cepat dan aman menggunakan berbagai metode.',
  },
  {
    icon: 'user',
    title: 'Nikmati Acara',
    desc: 'Dapatkan e-tiket secara instan dan siap untuk dinikmati di acara.',
  },
];

export const HowItWorks: FC = () => {
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
            <Step key={i} step={step} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};