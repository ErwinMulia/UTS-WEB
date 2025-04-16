import { HeroSection } from "@/components/home/herosection";
import { EventList } from "@/components/organism/EventList";
import  CategorySection  from "@/components/organism/CategorySection";
import { TestimonialCard } from "@/components/molecul/TestimonialCard";
import  {Newsletter}  from "@/components/organism/Newsletter";
import { Footer } from "@/components/common/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategorySection />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Acara Populer</h2>
          <EventList />
        </div>
      </section>

      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TestimonialCard rating={0} text={""} author={""} />
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white">
        <Newsletter />
      </section>

      <Footer />
    </main>
  );
}