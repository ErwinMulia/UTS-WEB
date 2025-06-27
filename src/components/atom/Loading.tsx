// src/components/atom/LoadingAtom.tsx
export const LoadingAtom = () => (
  <div className="bg-white rounded-lg shadow p-8 text-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
    <p>Memuat data pesanan...</p>
  </div>
);