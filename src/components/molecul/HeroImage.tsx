interface HeroImageProps {
    src: string;
    alt: string;
  }
  
  export function HeroImage({ src, alt }: HeroImageProps) {
    return (
      <div className="flex justify-center relative">
        <div className="relative w-full max-w-md">
          <img 
            src={src} 
            alt={alt} 
            className="rounded-lg w-full h-auto object-contain drop-shadow-2xl"
          />
          {/* Decorative glowing blob */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-20 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
      </div>
    );
  }