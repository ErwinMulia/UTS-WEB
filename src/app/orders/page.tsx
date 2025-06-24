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
  user_id: string;
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
      fetchOrders(data.session.user.id);
    };
    checkAuth();
  }, [router]);

  const fetchOrders = async (userId: string) => {
    try {
      setLoading(true);
      setError('');

      console.log('Fetching orders for user:', userId);

      // Ambil data orders terlebih dahulu
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (ordersError) {
        console.error('Orders error:', ordersError);
        throw ordersError;
      }

      if (!ordersData || ordersData.length === 0) {
        console.log('No orders found for user');
        setOrders([]);
        return;
      }

      console.log('Found orders:', ordersData.length);

      // Ambil order items dan event data secara terpisah untuk menghindari masalah foreign key
      const ordersWithItems = await Promise.all(
        ordersData.map(async (order) => {
          try {
            // Ambil order items
            const { data: orderItemsData, error: itemsError } = await supabase
              .from('order_items')
              .select('id, order_id, event_id, quantity, price')
              .eq('order_id', order.id);

            if (itemsError) {
              console.error('Order items error:', itemsError);
              throw itemsError;
            }

            if (!orderItemsData || orderItemsData.length === 0) {
              return {
                ...order,
                items: [],
              };
            }

            // Untuk setiap item, ambil data event secara terpisah
            const itemsWithEvents = await Promise.all(
              orderItemsData.map(async (item) => {
                try {
                  // Coba query dengan nama tabel 'events' (plural)
                  let { data: eventData, error: eventError } = await supabase
                    .from('events')
                    .select('title, date, location, image_url')
                    .eq('id', item.event_id)
                    .single();

                  // Jika gagal, coba dengan nama tabel 'event' (singular)
                  if (eventError && eventError.code === 'PGRST106') {
                    console.log('Trying with singular table name...');
                    const result = await supabase
                      .from('event')
                      .select('title, date, location, image_url')
                      .eq('id', item.event_id)
                      .single();
                    
                    eventData = result.data;
                    eventError = result.error;
                  }

                  if (eventError) {
                    console.warn(`Event not found for event_id: ${item.event_id}`, eventError);
                    return {
                      ...item,
                      event: {
                        title: 'Event tidak tersedia',
                        date: '',
                        location: 'Lokasi tidak tersedia',
                        image_url: ''
                      }
                    };
                  }

                  return {
                    ...item,
                    event: eventData || {
                      title: 'Event tidak tersedia',
                      date: '',
                      location: 'Lokasi tidak tersedia',
                      image_url: ''
                    }
                  };
                } catch (itemError) {
                  console.error('Error fetching event for item:', item.event_id, itemError);
                  return {
                    ...item,
                    event: {
                      title: 'Event tidak tersedia',
                      date: '',
                      location: 'Lokasi tidak tersedia',
                      image_url: ''
                    }
                  };
                }
              })
            );

            return {
              ...order,
              items: itemsWithEvents,
            };
          } catch (orderError) {
            console.error('Error processing order:', order.id, orderError);
            return {
              ...order,
              items: [],
            };
          }
        })
      );

      setOrders(ordersWithItems);
      console.log('Orders loaded successfully:', ordersWithItems.length);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(`Gagal mengambil data pesanan: ${err?.message || 'Terjadi kesalahan yang tidak diketahui'}`);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch (error) {
      return dateString;
    }
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, { label: string; color: string }> = {
      pending: { label: 'Menunggu Pembayaran', color: 'bg-yellow-100 text-yellow-800' },
      paid: { label: 'Pembayaran Berhasil', color: 'bg-green-100 text-green-800' },
      cancelled: { label: 'Dibatalkan', color: 'bg-red-100 text-red-800' },
      completed: { label: 'Selesai', color: 'bg-blue-100 text-blue-800' },
    };
    return statusMap[status] || { label: status, color: 'bg-gray-100 text-gray-800' };
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Pesanan Saya</h1>

          {loading ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p>Memuat data pesanan...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p className="font-medium">Terjadi Kesalahan:</p>
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Coba Lagi
              </button>
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-4 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">ID Pesanan: {order.id}</p>
                        <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusLabel(order.status).color}`}
                      >
                        {getStatusLabel(order.status).label}
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {order.items && order.items.length > 0 ? (
                      order.items.map((item) => (
                        <div key={item.id} className="p-4 flex flex-col md:flex-row">
                          <div className="md:w-1/4 mb-4 md:mb-0">
                            <div className="relative h-32 w-full rounded-md overflow-hidden">
                              {item.event?.image_url ? (
                                <Image
                                  src={item.event.image_url}
                                  alt={item.event.title || 'Event Image'}
                                  fill
                                  style={{ objectFit: 'cover' }}
                                  onError={(e) => {
                                    console.error('Image load error:', e);
                                  }}
                                />
                              ) : (
                                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                                  <FaTicketAlt className="text-gray-400" size={32} />
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="md:w-3/4 md:pl-4">
                            <h3 className="font-medium text-lg">
                              {item.event?.title || 'Event tidak tersedia'}
                            </h3>

                            <div className="mt-2 space-y-1">
                              <div className="flex items-center text-sm text-gray-600">
                                <FaCalendarAlt className="mr-2 text-gray-400" />
                                <span>{item.event?.date ? formatDate(item.event.date) : '-'}</span>
                              </div>

                              <div className="flex items-center text-sm text-gray-600">
                                <FaMapMarkerAlt className="mr-2 text-gray-400" />
                                <span>{item.event?.location || '-'}</span>
                              </div>
                            </div>

                            <div className="mt-3 flex justify-between items-center">
                              <div className="text-sm">
                                <span className="text-gray-600">Jumlah: </span>
                                <span className="font-medium">{item.quantity} tiket</span>
                              </div>
                              <div className="text-blue-600 font-medium">
                                {formatPrice(item.price * item.quantity)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        Tidak ada item dalam pesanan ini
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-gray-50 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Metode Pembayaran:</p>
                      <p className="font-medium">{order.payment_method || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total:</p>
                      <p className="text-lg font-bold text-blue-600">{formatPrice(order.total_price)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <FaTicketAlt className="mx-auto text-gray-300" size={48} />
              <h3 className="mt-4 text-lg font-medium">Belum ada pesanan</h3>
              <p className="mt-2 text-gray-500">Anda belum memiliki riwayat pesanan tiket</p>
              <button
                onClick={() => router.push('/')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Jelajahi Event
              </button>
            </div>
          )}
        </div>
      </main>

      <FooterSectionOrganism />
    </div>
  );
}