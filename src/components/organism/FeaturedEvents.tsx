'use client';

import { ArrowRightIcon } from 'lucide-react';
import { EventCard } from '../molecul/EventCard';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseclient';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  image_url: string;
  price: number;
}

export function FeaturedEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();

    // Menambahkan event listener untuk refresh data ketika ada perubahan
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleStorageChange = (event: StorageEvent) => {
    // Refresh data ketika ada perubahan di localStorage dengan key 'events_updated'
    if (event.key === 'events_updated') {
      fetchEvents();
    }
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);

      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Gagal memuat event');
    } finally {
      setLoading(false);
    }
  };

  // Format harga ke format Rupiah
  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  return (
    <div className="py-8 bg-gray-50"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6"> 
          <h2 className="text-xl font-bold text-gray-800">Event Terbaru</h2> 
          <a href="/events" className="text-blue-600 flex items-center font-medium hover:underline">
            Lihat Semua <ArrowRightIcon size={16} className="ml-1" />
          </a>
        </div>

        {loading ? (
          <div className="text-center py-10">Memuat event...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : events.length === 0 ? (
          <div className="text-center py-10">Tidak ada event tersedia</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> 
            {events.map((event) => (
              <EventCard 
                key={event.id} 
                event={{
                  id: event.id,
                  title: event.title,
                  date: event.date,
                  location: event.location,
                  image: event.image_url,
                  price: formatPrice(event.price)
                }} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}