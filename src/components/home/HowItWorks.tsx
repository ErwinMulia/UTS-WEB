import { HowItWorks } from '@/components/organism/HowItWork';
import { HeroSection } from '@/components/home/herosection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      
      <HowItWorks />
    </main>
  );
}