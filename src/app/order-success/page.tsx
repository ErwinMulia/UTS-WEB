'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';
import { Header } from '@/components/organism/Header';
import { FooterSectionOrganism } from '@/components/organism/FooterSectionOrganism';

export default function OrderSuccessPage() {
  const router = useRouter();

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
          <div className="flex justify-center mb-4">
            <FaCheckCircle className="text-green-500" size={64} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Pesanan Berhasil!</h1>
          <p className="text-gray-600 mb-6">
            Terima kasih atas pesanan Anda. Detail pesanan dan tiket telah dikirim ke email Anda.
          </p>
          <div className="flex flex-col space-y-4">
            <button 
              onClick={() => router.push('/')}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Kembali ke Beranda
            </button>
            <button 
              onClick={() => router.push('/')}
              className="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-md hover:bg-blue-50 transition"
            >
              Jelajahi Event Lainnya
            </button>
          </div>
        </div>
      </div>
      <FooterSectionOrganism />
    </>
  );
}