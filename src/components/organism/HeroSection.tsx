import { FaSearch } from "react-icons/fa";
import { ButtonWithIcon } from "@/components/atom/ButtonWithIcon";
import  StatsSections  from "@/components/molecul/StatsSection";
import { HeroImage } from "@/components/molecul/HeroImage";

export function HeroSection() {
  return (
    <div className="relative bg-blue-600 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div>
            <h1 className="text-4xl font-bold mb-4">Temukan dan Pesan Tiket Acara Favorit Anda</h1>
            <p className="text-lg mb-6">Temukan konser, festival, seminar, dan berbagai acara menarik lainnya di seluruh Indonesia dengan mudah dan aman.</p>
            
            <StatsSections />

            <ButtonWithIcon 
              icon={FaSearch}
              text="Jelajahi Acara"
              className="bg-white text-blue-600 hover:bg-blue-100 shadow-lg"
            />
          </div>

          <HeroImage 
            src="/image/LOGOTIKETS1.svg" 
            alt="Event Tickets" 
          />
        </div>
      </div>
    </div>
  );
}