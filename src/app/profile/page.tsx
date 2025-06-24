'use client';

import React from 'react';
import { Header } from '@/components/organism/Header';
import { FooterSectionOrganism } from '@/components/organism/FooterSectionOrganism';
import { ProfileOrganism } from '@/components/organism/ProfileOrganism';

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <ProfileOrganism />
      </main>
      
      <FooterSectionOrganism />
    </div>
  );
}