import { FC } from 'react';
import { Icon, iconMap } from '../atom/IconMap';
import { Text2 } from '@/components/atom/Text2';
import { motion } from 'framer-motion';

interface StepProps {
    step: {
      icon: 'search' | 'ticket' | 'user'; 
      title: string;
      desc: string;
    };
    index: number;
  }
  
  export const Step: FC<StepProps> = ({ step, index }) => {
    return (
      <motion.div
        className="text-center bg-white text-blue-700 rounded-2xl p-6 transition transform hover:-translate-y-1 hover:shadow-xl group shadow-md"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <span className="text-sm text-blue-500 mb-2 block font-semibold">
          Langkah {index + 1}
        </span>
        <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full text-blue-600 mb-4 w-16 h-16 transition-transform duration-300 group-hover:scale-110 mx-auto">
          <Icon type={step.icon} size={32} />
        </div>
        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
        <Text2 className="text-sm text-gray-600">{step.desc}</Text2>
      </motion.div>
    );
  };  