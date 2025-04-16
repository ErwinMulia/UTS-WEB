import { EmailSubscriptionForm } from '@/components/molecul/EmailSubscriptionForm';
import { TestimonialCard } from '@/components/molecul/TestimonialCard';

export const Newsletter = () => {
  const testimonials = [
    {
      rating: 5,
      text: "Proses pemesanan tiketnya super cepat dan nggak ribet. E-tiket langsung masuk email, jadi gak perlu dicetak lagi!",
      author: "Andi, Jakarta"
    },
    {
      rating: 4,
      text: "Sistemnya aman dan transparan. Saya bisa cek status tiket kapan aja. Sangat membantu, apalagi buat event-event besar.",
      author: "Rina, Surabaya"
    }
  ];

  return (
    <div className="py-12 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-2">Tetap Terinformasi</h2>
            <p className="mb-6">Dapatkan info terbaru tentang acara-acara terpopuler langsung ke email Anda</p>
            <EmailSubscriptionForm className="max-w-md mx-auto lg:mx-0" />
          </div>

          <div className="lg:w-1/2">
            <h3 className="text-xl font-semibold mb-4 text-center lg:text-left">Apa kata mereka?</h3>
            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={index}
                  rating={testimonial.rating}
                  text={testimonial.text}
                  author={testimonial.author}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};