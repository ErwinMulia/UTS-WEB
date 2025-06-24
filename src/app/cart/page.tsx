'use client';

import React from 'react';
import { Header } from '@/components/organism/Header';
import { FooterSectionOrganism } from '@/components/organism/FooterSectionOrganism';
import { CartOrganism } from '@/components/organism/CartOrganism';

export default function CartPage() {
  return (
    <>
      <Header />
      <CartOrganism />
      <FooterSectionOrganism />
    </>
  );
}