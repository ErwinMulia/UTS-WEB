import { FC } from 'react';

interface TextProps {
  children: string;
  className?: string;
}

export const Text2: FC<TextProps> = ({ children, className }) => {
  return <p className={className}>{children}</p>;
};