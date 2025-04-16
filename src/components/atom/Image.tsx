interface ImageProps {
    src: string;
    alt: string;
  }
  
  export function Image({ src, alt }: ImageProps) {
    return <img src={src} alt={alt} className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105" />;
  }
  