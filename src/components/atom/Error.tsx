// src/components/atom/ErrorAtom.tsx
interface Props {
  message: string;
  onRetry: () => void;
}

export const ErrorAtom = ({ message, onRetry }: Props) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
    <p className="font-medium">Terjadi Kesalahan:</p>
    <p>{message}</p>
    <button
      onClick={onRetry}
      className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
    >
      Coba Lagi
    </button>
  </div>
);