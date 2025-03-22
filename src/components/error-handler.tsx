import { useEffect } from 'react';
import { toast } from 'sonner';

interface ErrorHandlerProps {
  error: any;
}

export default function ErrorHandler({ error }: ErrorHandlerProps) {
  useEffect(() => {
    if (error) {
      toast.error('Error', {
        description: error.message || 'An unexpected error occurred',
        duration: 5000,
      });
    }
  }, [error]);

  return null;
}
