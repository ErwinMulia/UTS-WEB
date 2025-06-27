// src/app/orders/page.tsx (atau pages/orders.tsx)
import  OrdersOrganism  from '@/components/organism/OrdersOrganism';

export default function OrdersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header dan Footer tetap bisa kamu panggil di sini */}
      <OrdersOrganism />
    </div>
  );
}