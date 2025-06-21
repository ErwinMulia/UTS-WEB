  import { EmailInput } from '@/components/atom/EmailInput';

  type EmailSubscriptionFormProps = {
    buttonText?: string;
    className?: string;
  };

  export const EmailSubscriptionForm = ({ 
    buttonText = 'Subscribe', 
    className = '' 
  }: EmailSubscriptionFormProps) => (
    <div className={`flex ${className}`}>
      <EmailInput />
      <button className="bg-blue-600 text-white px-6 py-3 rounded-r-md hover:bg-blue-700 transition border border-blue-600">
        {buttonText}
      </button>
    </div>
  );