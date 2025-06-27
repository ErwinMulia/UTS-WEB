'use client';

import React from 'react';
import Link from 'next/link';

interface AuthLinkProps {
  text: string;
  linkText: string;
  href: string;
  className?: string;
}

export const AuthLink = ({
  text,
  linkText,
  href,
  className = '',
}: AuthLinkProps) => {
  return (
    <p className={`text-sm text-center ${className}`}>
      {text}{' '}
      <Link href={href} className="font-medium text-blue-600 hover:text-blue-500">
        {linkText}
      </Link>
    </p>
  );
};