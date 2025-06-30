'use client';

import React, { useEffect, useState } from 'react';
import { Header } from '@/components/organism/Header';
import { FooterSectionOrganism } from '@/components/organism/FooterSectionOrganism';
import { EventCard } from '@/components/molecul/EventCard';
import { supabase } from '@/lib/supabaseclient';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  image_url: string;
  price: number;
}

export default function EventsPage() {
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
        .order('created_at', { ascending: false });

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
    <main className="min-h-screen bg-white">
      <Header />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center text-gray-700 mb-12">Semua Event</h1>
          
          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4">Memuat event...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : events.length === 0 ? (
            <div className="text-center py-10">Tidak ada event tersedia</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> 
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
      </section>

      <FooterSectionOrganism />
    </main>
  );
}