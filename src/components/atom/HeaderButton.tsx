'use client';

import React from 'react';

interface HeaderButtonProps {
  children: React.ReactNode;
  href: string;
  className: string;
}

const HeaderButton = ({ children, href, className }: HeaderButtonProps) => (
  <a href={href} className={`${className} text-sm font-medium`}>
    {children}
  </a>
);

export default HeaderButton;