'use client';

import React from 'react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

interface NotificationProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

export const Notification = ({ type, message, onClose }: NotificationProps) => {
  return (
    <div className={`p-4 rounded-md ${type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {type === 'success' ? (
            <FaCheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <FaExclamationCircle className="h-5 w-5 text-red-500" />
          )}
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
            {message}
          </p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              onClick={onClose}
              className={`inline-flex rounded-md p-1.5 ${type === 'success' ? 'bg-green-50 text-green-500 hover:bg-green-100' : 'bg-red-50 text-red-500 hover:bg-red-100'}`}
            >
              <span className="sr-only">Dismiss</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};