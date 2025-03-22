import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      <p>{message}</p>
    </div>
  );
};
