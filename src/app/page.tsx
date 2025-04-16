'use client'

import { Header } from '@/components/common/header';
import { HeroSection } from '@/components/home/herosection';
import Categories from '@/components/home/category';
import FeaturedEvents  from '@/components/home/acara';
import HowItWorks  from '@/components/home/HowItWorks';
import {Newsletter}  from '@/components/home/Newsletter';
import { Footer } from '@/components/common/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <Categories />
      <FeaturedEvents />
      <HowItWorks />
      <Newsletter title={''} description={''} />
      <Footer />
    </div>
  );
}