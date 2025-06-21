'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseclient'
import { useRouter } from 'next/navigation'

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([])
  const [cart, setCart] = useState<{event: any, quantity: number}[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Fungsi untuk mengambil data event dari Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('date', { ascending: true })

        if (error) throw error
        setEvents(data || [])
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  // Fungsi untuk menambah event ke keranjang
  const addToCart = (event: any) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.event.id === event.id)
      if (existingItem) {
        return prevCart.map(item => 
          item.event.id === event.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      }
      return [...prevCart, { event, quantity: 1 }]
    })
  }

  // Fungsi untuk mengurangi jumlah tiket
  const decreaseQuantity = (eventId: string) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.event.id === eventId 
          ? { ...item, quantity: Math.max(1, item.quantity - 1) } 
          : item
      )
    )
  }

  // Fungsi untuk menambah jumlah tiket
  const increaseQuantity = (eventId: string) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.event.id === eventId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    )
  }

  // Fungsi untuk menghapus item dari keranjang
  const removeFromCart = (eventId: string) => {
    setCart(prevCart => prevCart.filter(item => item.event.id !== eventId))
  }

  // Fungsi untuk checkout
  const handleCheckout = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/login')
      return
    }

    // Hitung total harga
    const totalPrice = cart.reduce(
      (sum, item) => sum + (item.event.price * item.quantity),
      0
    )

    try {
      // Buat order baru
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user.id,
          total_price: totalPrice,
          status: 'pending'
        }])
        .select()
        .single()

      if (orderError) throw orderError

      // Tambahkan order items
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(
          cart.map(item => ({
            order_id: order.id,
            event_id: item.event.id,
            quantity: item.quantity,
            price: item.event.price
          }))
        )

      if (itemsError) throw itemsError

      // Kosongkan keranjang
      setCart([])
      router.push(`/order-success/${order.id}`)
    } catch (error) {
      console.error('Checkout error:', error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Daftar Event</h1>
        
        {/* Daftar Event */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map(event => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={event.image_url} 
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                <p className="text-gray-600 mb-2">{new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-600 mb-4">{event.location}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">
                    Rp {event.price.toLocaleString('id-ID')}
                  </span>
                  <button
                    onClick={() => addToCart(event)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Tambah ke Keranjang
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Keranjang Belanja */}
        {cart.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 border-t">
            <h3 className="text-lg font-bold mb-2">Keranjang Belanja</h3>
            <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
              {cart.map(item => (
                <div key={item.event.id} className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{item.event.title}</span>
                    <div className="flex items-center mt-1">
                      <button 
                        onClick={() => decreaseQuantity(item.event.id)}
                        className="px-2 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button 
                        onClick={() => increaseQuantity(item.event.id)}
                        className="px-2 bg-gray-200 rounded"
                      >
                        +
                      </button>
                      <span className="ml-4">
                        Rp {(item.event.price * item.quantity).toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.event.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold">
                Total: Rp {cart.reduce((sum, item) => sum + (item.event.price * item.quantity), 0).toLocaleString('id-ID')}
              </span>
              <button
                onClick={handleCheckout}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Pesan Sekarang
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}