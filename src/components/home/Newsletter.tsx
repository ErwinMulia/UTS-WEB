import { ReactNode } from 'react';
import { Button } from '@/components/atom/Button';

type NewsletterProps = {
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
};

export function Newsletter({ 
  title, 
  description, 
  children,
  className = '' 
}: NewsletterProps) {
  return (
    <section className={`py-12 bg-white text-gray-900 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="mb-8 max-w-2xl mx-auto">{description}</p>

          {children || (
            <Button variant="primary" size="lg">
              Daftar Sekarang
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}