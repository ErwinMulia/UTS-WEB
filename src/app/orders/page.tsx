'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseclient';
import { Header } from '@/components/organism/Header';
import { FooterSectionOrganism } from '@/components/organism/FooterSectionOrganism';
import { FaTicketAlt, FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';

interface Order {
  id: string;
  user_id: string;
  created_at: string;
  status: string;
  total_amount: number;
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
      
      // Ambil data pesanan dari tabel orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (ordersError) throw ordersError;
      
      if (!ordersData || ordersData.length === 0) {
        setOrders([]);
        return;
      }
      
      // Untuk setiap pesanan, ambil item pesanan dan data event terkait
      const ordersWithItems = await Promise.all(ordersData.map(async (order) => {
        const { data: orderItemsData, error: itemsError } = await supabase
          .from('order_items')
          .select(`
            id,
            order_id,
            event_id,
            quantity,
            price,
            events:event_id (title, date, location, image_url)
          `)
          .eq('order_id', order.id);
        
        if (itemsError) throw itemsError;
        
        return {
          ...order,
          items: orderItemsData || []
        };
      }));
      
      setOrders(ordersWithItems);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Gagal mengambil data pesanan');
    } finally {
      setLoading(false);
    }
  };

  // Format harga ke format Rupiah
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Format tanggal ke format Indonesia
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Mendapatkan status pesanan dalam bahasa Indonesia
  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, { label: string; color: string }> = {
      'pending': { label: 'Menunggu Pembayaran', color: 'bg-yellow-100 text-yellow-800' },
      'paid': { label: 'Pembayaran Berhasil', color: 'bg-green-100 text-green-800' },
      'cancelled': { label: 'Dibatalkan', color: 'bg-red-100 text-red-800' },
      'completed': { label: 'Selesai', color: 'bg-blue-100 text-blue-800' }
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
            <div className="text-center py-8">Memuat data pesanan...</div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-4 border-b">
                    <div className="flex flex-wrap justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">ID Pesanan: {order.id}</p>
                        <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusLabel(order.status).color}`}>
                        {getStatusLabel(order.status).label}
                      </div>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <div key={item.id} className="p-4 flex flex-col md:flex-row">
                        <div className="md:w-1/4 mb-4 md:mb-0">
                          <div className="relative h-32 w-full rounded-md overflow-hidden">
                            {item.event?.image_url ? (
                              <Image 
                                src={item.event.image_url} 
                                alt={item.event.title} 
                                fill 
                                style={{ objectFit: 'cover' }} 
                              />
                            ) : (
                              <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                                <FaTicketAlt className="text-gray-400" size={32} />
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="md:w-3/4 md:pl-4">
                          <h3 className="font-medium text-lg">{item.event?.title || 'Event tidak tersedia'}</h3>
                          
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
                    ))}
                  </div>
                  
                  <div className="p-4 bg-gray-50 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Metode Pembayaran:</p>
                      <p className="font-medium">{order.payment_method || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total:</p>
                      <p className="text-lg font-bold text-blue-600">{formatPrice(order.total_amount)}</p>
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
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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