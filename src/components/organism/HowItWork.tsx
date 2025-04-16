'use client';

import { motion } from 'framer-motion';
import { SearchIcon, TicketIcon, UserIcon } from 'lucide-react';
import { StepCard } from '@/components/molecul/StepCard';

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
    <div className="py-16 bg-blue-600 px-4 sm:px-10 lg:px-20 w-full"> {/* Full width */}
      <div className="mx-auto"> {/* Center the content, no max-width */}
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
            <StepCard key={i} index={i} {...step} />
          ))}
        </div>
      </div>
    </div>
  );
};