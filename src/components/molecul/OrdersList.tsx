// src/components/molecule/OrderListMolecule.tsx
import React from 'react';
import Image from 'next/image';
import { FaTicketAlt, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { Order } from '@/components/organism/OrdersOrganism';

interface Props {
  orders: Order[];
}

export const OrderListMolecule = ({ orders }: Props) => {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
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
    <div className="space-y-6">
      {orders.map(order => (
        <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">ID Pesanan: {order.id}</p>
              <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusLabel(order.status).color}`}>
              {getStatusLabel(order.status).label}
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {order.items && order.items.length > 0 ? (
              order.items.map(item => (
                <div key={item.id} className="p-4 flex flex-col md:flex-row">
                  <div className="md:w-1/4 mb-4 md:mb-0 relative h-32 rounded-md overflow-hidden">
                    {item.event?.image_url ? (
                      <Image
                        src={item.event.image_url}
                        alt={item.event.title || 'Event Image'}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                        <FaTicketAlt className="text-gray-400" size={32} />
                      </div>
                    )}
                  </div>

                  <div className="md:w-3/4 md:pl-4">
                    <h3 className="font-medium text-lg">{item.event?.title || 'Event tidak tersedia'}</h3>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-2 text-gray-400" />
                        <span>{item.event?.date ? formatDate(item.event.date) : '-'}</span>
                      </div>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-gray-400" />
                        <span>{item.event?.location || '-'}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex justify-between items-center">
                      <div>
                        <span className="text-gray-600">Jumlah: </span>
                        <span className="font-medium">{item.quantity} tiket</span>
                      </div>
                      <div className="text-blue-600 font-medium">{formatPrice(item.price * item.quantity)}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">Tidak ada item dalam pesanan ini</div>
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
  );
};