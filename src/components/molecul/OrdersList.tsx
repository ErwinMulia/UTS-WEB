'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseclient';
import { Header } from '@/components/organism/Header';
import { FooterSectionOrganism } from '@/components/organism/FooterSectionOrganism';
import { FaTicketAlt, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

interface EventData {
  title: string;
  date: string;
  location: string;
  image_url: string;
}

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  events?: EventData | null;
}

interface Order {
  id: string;
  user_email: string;
  created_at: string;
  status: string;
  total_price: number;
  payment_method: string;
  order_items?: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace('/login');
        return;
      }
      const userEmail = data.session.user.email || '';
      fetchOrders(userEmail);
    };
    checkAuth();
  }, [router]);

  const fetchOrders = async (userEmail: string) => {
    try {
      setLoading(true);
      setError('');

      const { data: ordersData, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            quantity,
            price,
            events (
              title,
              date,
              location,
              image_url
            )
          )
        `)
        .eq('user_email', userEmail)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(ordersData as Order[]);
    } catch (err: any) {
      setError(`Gagal mengambil data pesanan: ${err.message || 'Terjadi kesalahan'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">
        {loading ? (
          <p className="text-gray-600 text-center">Memuat pesanan...</p>
        ) : error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500 text-center">Belum ada pesanan.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="mb-6 p-4 bg-white shadow rounded-md">
              <div className="mb-2 flex justify-between items-center">
                <p className="text-sm text-gray-600">ID Pesanan: {order.id}</p>
                <p className="text-sm text-gray-600">
                  {new Date(order.created_at).toLocaleDateString('id-ID')}
                </p>
              </div>
              <p className="font-medium text-blue-600">
                Total: Rp{order.total_price.toLocaleString('id-ID')}
              </p>
              <p className="text-sm text-gray-500">Status: {order.status}</p>

              <div className="mt-3 border-t pt-3">
                {(order.order_items ?? []).map((item) => (
                  <div key={item.id} className="flex gap-3 mb-4">
                    <div className="w-24 h-24 relative rounded overflow-hidden bg-gray-200">
                      {item.events?.image_url ? (
                        <Image
                          src={item.events.image_url}
                          alt={item.events.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaTicketAlt className="text-gray-400" size={32} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{item.events?.title || 'Event tidak tersedia'}</p>
                      <p className="text-sm text-gray-500">
                        <FaCalendarAlt className="inline-block mr-1" /> {item.events?.date || '-'}
                      </p>
                      <p className="text-sm text-gray-500">
                        <FaMapMarkerAlt className="inline-block mr-1" /> {item.events?.location || '-'}
                      </p>
                      <p className="text-sm mt-1">
                        Jumlah: {item.quantity} × Rp{item.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </main>

      <FooterSectionOrganism />
    </div>
  );
}