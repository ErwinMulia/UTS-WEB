'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseclient';
import { Header } from '@/components/organism/Header';
import { FooterSectionOrganism } from '@/components/organism/FooterSectionOrganism';
import { FaTicketAlt, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

interface Order {
  id: string;
  user_email: string;  // pastikan ada ini di interface jika ingin pakai
  created_at: string;
  status: string;
  total_price: number;
  payment_method: string;
  items: OrderItem[];
}

interface OrderItem {
  id: string;
  order_id: string;
  event_id: string;
  quantity: number;
  price: number;
  event: {
    title: string;
    date: string;
    location: string;
    image_url: string;
  };
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
      // Ambil user email, bukan user id
      const userEmail = data.session.user.email || '';
      fetchOrders(userEmail);
    };
    checkAuth();
  }, [router]);

  const fetchOrders = async (userEmail: string) => {
    try {
      setLoading(true);
      setError('');

      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_email', userEmail)  // <-- Ganti 'user_id' menjadi 'user_email'
        .order('created_at', { ascending: false });

      if (ordersError) {
        throw ordersError;
      }

      if (!ordersData || ordersData.length === 0) {
        setOrders([]);
        return;
      }

      const ordersWithItems = await Promise.all(
        ordersData.map(async (order) => {
          const { data: orderItemsData, error: itemsError } = await supabase
            .from('order_items')
            .select('id, order_id, event_id, quantity, price')
            .eq('order_id', order.id);

          if (itemsError) {
            throw itemsError;
          }

          const itemsWithEvents = await Promise.all(
            orderItemsData.map(async (item) => {
              const { data: eventData, error: eventError } = await supabase
                .from('events')
                .select('title, date, location, image_url')
                .eq('id', item.event_id)
                .single();

              return {
                ...item,
                event: eventData || {
                  title: 'Event tidak tersedia',
                  date: '',
                  location: 'Lokasi tidak tersedia',
                  image_url: ''
                }
              };
            })
          );

          return {
            ...order,
            items: itemsWithEvents,
          };
        })
      );

      setOrders(ordersWithItems);
    } catch (err: any) {
      setError(`Gagal mengambil data pesanan: ${err.message || 'Terjadi kesalahan'}`);
    } finally {
      setLoading(false);
    }
  };

  // ... (fungsi formatPrice, formatDate, getStatusLabel tetap sama)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      {/* ... layout konten dan render orders ... */}
      <FooterSectionOrganism />
    </div>
  );
}