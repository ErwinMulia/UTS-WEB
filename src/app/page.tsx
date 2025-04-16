import { HeroSection } from "@/components/organism/HeroSection";
import { FeaturedEvents } from "@/components/organism/FeaturedEvents";
import CategorySection from "@/components/organism/CategorySection";
import { HowItWorks } from "@/components/organism/HowItWork";
import { Newsletter } from "@/components/organism/Newsletter";
import { Header } from '../components/organism/Header';
import { FooterSectionOrganism } from "@/components/organism/FooterSectionOrganism";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      <Header />  

      <HeroSection />
      <section className="py-16 bg-gray-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategorySection />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-12">Acara Populer</h2>
          <FeaturedEvents />
        </div>
      </section>

      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HowItWorks />
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between gap-8 flex-wrap"> 

            <div className="flex-1 min-w-[300px]">

            </div>

            <div className="flex-1 min-w-[300px]">

            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white">
        <Newsletter />
      </section>

      <FooterSectionOrganism />
    </main>
  );
}