import { motion } from 'framer-motion';
import { IconBox } from '@/components/atom/iconBox';
import { StepNumber } from '../atom/StepNumber';

type StepCardProps = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  index: number;
};

export const StepCard = ({ icon, title, desc, index }: StepCardProps) => (
  <motion.div
    className="text-center bg-white text-blue-700 rounded-2xl p-6 transition transform hover:-translate-y-1 hover:shadow-xl group shadow-md"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2, duration: 0.6 }}
    viewport={{ once: true }}
  >
    <StepNumber number={index + 1} />
    <IconBox>{icon}</IconBox>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{desc}</p>
  </motion.div>
);