import { ReactNode } from 'react';

type IconBoxProps = {
  children: ReactNode;
  className?: string;
};

export const IconBox = ({ children, className = '' }: IconBoxProps) => (
  <div className={`inline-flex items-center justify-center p-4 bg-blue-100 rounded-full text-blue-600 mb-4 w-16 h-16 transition-transform duration-300 group-hover:scale-110 mx-auto ${className}`}>
    {children}
  </div>
);