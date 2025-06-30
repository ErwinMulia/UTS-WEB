'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseclient';
import { Notification } from '../atom/Notification';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  image_url: string;
  available_tickets: number;
}

export const AdminOrganism = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    description: '',
    date: '',
    location: '',
    price: 0,
    image_url: '',
    available_tickets: 0
  });
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if Supabase environment variables are defined
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase environment variables are missing');
      showNotification('error', 'Database configuration error. Please check environment variables.');
      setLoading(false);
      return;
    }
    
    const checkAdmin = () => {
      try {
        // Check if user is logged in using localStorage instead of Supabase auth
        const userId = localStorage.getItem('user_id');
        const userRole = localStorage.getItem('user_role');
        
        if (!userId) {
          router.push('/login');
          return;
        }

        // Check if user has admin role
        if (userRole !== 'admin') {
          router.push('/');
          return;
        }
      } catch (err) {
        console.error('Error in admin check:', err);
        showNotification('error', 'Error verifying admin privileges');
      }
    };

    checkAdmin();
    fetchEvents();
  }, [router]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      console.log('Fetching events from Supabase...');
      
      // Check if supabase client is properly initialized
      if (!supabase) {
        console.error('Supabase client is not initialized');
        showNotification('error', 'Database connection error');
        return;
      }
      
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error details:', error);
        throw error;
      }
      
      console.log('Events fetched successfully:', data?.length || 0, 'events');
      setEvents(data || []);
    } catch (err) {
      console.error('Error fetching events:', err);
      showNotification('error', `Gagal mengambil data event: ${err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async () => {
    try {
      if (!validateEventData(newEvent)) {
        return;
      }

      const { error } = await supabase
        .from('events')
        .insert([{
          ...newEvent,
          price: Number(newEvent.price),
          available_tickets: Number(newEvent.available_tickets)
        }]);

      if (error) throw error;

      setNewEvent({
        title: '',
        description: '',
        date: '',
        location: '',
        price: 0,
        image_url: '',
        available_tickets: 0
      });

      // Trigger update untuk halaman utama
      localStorage.setItem('events_updated', new Date().toISOString());
      window.dispatchEvent(new Event('storage'));

      showNotification('success', 'Event berhasil ditambahkan');
      fetchEvents();
    } catch (err) {
      console.error('Error adding event:', err);
      showNotification('error', 'Gagal menambahkan event');
    }
  };

  const handleUpdateEvent = async () => {
    if (!editingEvent || !editingEvent.id) {
      showNotification('error', 'Data event tidak valid');
      return;
    }

    try {
      if (!validateEventData(editingEvent)) {
        return;
      }

      const { error } = await supabase
        .from('events')
        .update({
          title: editingEvent.title,
          description: editingEvent.description,
          date: editingEvent.date,
          location: editingEvent.location,
          price: Number(editingEvent.price),
          image_url: editingEvent.image_url,
          available_tickets: Number(editingEvent.available_tickets)
        })
        .eq('id', editingEvent.id);

      if (error) throw error;

      setEditingEvent(null);
      
      // Trigger update untuk halaman utama
      localStorage.setItem('events_updated', new Date().toISOString());
      window.dispatchEvent(new Event('storage'));
      
      showNotification('success', 'Event berhasil diperbarui');
      fetchEvents();
    } catch (err) {
      console.error('Error updating event:', err);
      showNotification('error', 'Gagal memperbarui event');
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Trigger update untuk halaman utama
      localStorage.setItem('events_updated', new Date().toISOString());
      window.dispatchEvent(new Event('storage'));
      
      showNotification('success', 'Event berhasil dihapus');
      fetchEvents();

      // Hapus juga dari keranjang jika ada
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const updatedCart = cartItems.filter((item: any) => item.id !== id);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error('Error deleting event:', err);
      showNotification('error', 'Gagal menghapus event');
    }
  };

  const validateEventData = (event: Partial<Event>) => {
    if (!event.title || event.title.trim() === '') {
      showNotification('error', 'Judul event tidak boleh kosong');
      return false;
    }
    if (!event.description || event.description.trim() === '') {
      showNotification('error', 'Deskripsi event tidak boleh kosong');
      return false;
    }
    if (!event.date || event.date.trim() === '') {
      showNotification('error', 'Tanggal event tidak boleh kosong');
      return false;
    }
    if (!event.location || event.location.trim() === '') {
      showNotification('error', 'Lokasi event tidak boleh kosong');
      return false;
    }
    if (!event.price || event.price <= 0) {
      showNotification('error', 'Harga event harus lebih dari 0');
      return false;
    }
    if (!event.available_tickets || event.available_tickets <= 0) {
      showNotification('error', 'Jumlah tiket tersedia harus lebih dari 0');
      return false;
    }
    if (!event.image_url || event.image_url.trim() === '') {
      showNotification('error', 'URL gambar tidak boleh kosong');
      return false;
    }
    return true;
  };

  const addToCart = (event: Event) => {
    // Ambil keranjang dari localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    // Format data event untuk keranjang
    const cartEvent = {
      id: event.id,
      title: event.title,
      date: new Date(event.date).toLocaleDateString('id-ID'),
      location: event.location,
      price: `Rp ${event.price.toLocaleString('id-ID')}`,
      image: event.image_url,
      quantity: 1
    };
    
    // Periksa apakah item sudah ada di keranjang
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === event.id);
    
    if (existingItemIndex >= 0) {
      // Jika sudah ada, tambah quantity
      cartItems[existingItemIndex].quantity += 1;
      showNotification('success', 'Jumlah tiket dalam keranjang ditambahkan');
    } else {
      // Jika belum ada, tambahkan dengan quantity 1
      cartItems.push(cartEvent);
      showNotification('success', 'Tiket berhasil ditambahkan ke keranjang');
    }
    
    // Simpan kembali ke localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Trigger storage event untuk update CartIcon
    window.dispatchEvent(new Event('storage'));
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-xl font-semibold">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard Admin</h1>
        
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}
        
        {/* Form Tambah/Edit Event */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">
            {editingEvent ? 'Edit Event' : 'Tambah Event Baru'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Judul Event
              </label>
              <input
                type="text"
                value={editingEvent ? editingEvent.title : newEvent.title}
                onChange={(e) => editingEvent 
                  ? setEditingEvent({...editingEvent, title: e.target.value})
                  : setNewEvent({...newEvent, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi
              </label>
              <input
                type="text"
                value={editingEvent ? editingEvent.description : newEvent.description}
                onChange={(e) => editingEvent 
                  ? setEditingEvent({...editingEvent, description: e.target.value})
                  : setNewEvent({...newEvent, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal
              </label>
              <input
                type="datetime-local"
                value={editingEvent ? editingEvent.date : newEvent.date}
                onChange={(e) => editingEvent 
                  ? setEditingEvent({...editingEvent, date: e.target.value})
                  : setNewEvent({...newEvent, date: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lokasi
              </label>
              <input
                type="text"
                value={editingEvent ? editingEvent.location : newEvent.location}
                onChange={(e) => editingEvent 
                  ? setEditingEvent({...editingEvent, location: e.target.value})
                  : setNewEvent({...newEvent, location: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Harga (Rp)
              </label>
              <input
                type="number"
                value={editingEvent ? editingEvent.price : newEvent.price}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  editingEvent 
                    ? setEditingEvent({...editingEvent, price: value})
                    : setNewEvent({...newEvent, price: value});
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jumlah Tiket Tersedia
              </label>
              <input
                type="number"
                value={editingEvent ? editingEvent.available_tickets : newEvent.available_tickets}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  editingEvent 
                    ? setEditingEvent({...editingEvent, available_tickets: value})
                    : setNewEvent({...newEvent, available_tickets: value});
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Gambar
              </label>
              <input
                type="text"
                value={editingEvent ? editingEvent.image_url : newEvent.image_url}
                onChange={(e) => editingEvent 
                  ? setEditingEvent({...editingEvent, image_url: e.target.value})
                  : setNewEvent({...newEvent, image_url: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            {editingEvent ? (
              <>
                <button
                  onClick={handleUpdateEvent}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Perbarui Event
                </button>
                <button
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Batal
                </button>
              </>
            ) : (
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Tambah Event
              </button>
            )}
          </div>
        </div>

        {/* Daftar Event */}
        <h2 className="text-2xl font-bold mb-4">Daftar Event</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Judul
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Harga
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tiket Tersedia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{event.title}</div>
                    <div className="text-sm text-gray-500">{event.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      Rp {event.price.toLocaleString('id-ID')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {event.available_tickets}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingEvent(event)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Hapus
                      </button>
                      <button
                        onClick={() => addToCart(event)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Tambah ke Keranjang
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};