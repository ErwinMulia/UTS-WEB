import { EmailSubscriptionForm } from '@/components/molecul/EmailSubscriptionForm';

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
            <h3 className="text-2xl font-semibold text-center lg:text-left mb-6">Apa Kata Mereka?</h3>
            <div className="flex flex-wrap justify-between gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-1 min-w-[300px]">
                  <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <div className="flex mb-4">

                      <span className="text-yellow-500">
                        {"★".repeat(testimonial.rating)}{"☆".repeat(5 - testimonial.rating)}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{testimonial.text}</p>
                    <p className="font-semibold">{testimonial.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};