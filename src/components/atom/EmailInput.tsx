type EmailInputProps = {
    placeholder?: string;
    className?: string;
  };
  
  export const EmailInput = ({ placeholder = 'Alamat email Anda', className = '' }: EmailInputProps) => (
    <input
      type="email"
      placeholder={placeholder}
      className={`flex-1 px-4 py-3 rounded-l-md text-gray-900 focus:outline-none border border-gray-300 ${className}`}
    />
  );