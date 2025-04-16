'use client';

import React from 'react';
import Image from 'next/image';

const Logo = () => (
  <div className='flex items-center gap-2'>
    <Image
      src="/image/logotiketsj.svg"
      alt="Logo"
      width={30}
      height={30}
      priority
    />
  </div>
);

export default Logo;