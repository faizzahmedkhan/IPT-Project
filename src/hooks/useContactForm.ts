import { useState } from 'react';
import { contactApi, ContactFormData } from '@/lib/api';

interface UseContactFormResult {
  submitForm: (data: ContactFormData) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

export function useContactForm(): UseContactFormResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitForm = async (data: ContactFormData): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      await contactApi.submit(data);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit form');
      console.error('Error submitting contact form:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return { submitForm, loading, error, success, reset };
}
