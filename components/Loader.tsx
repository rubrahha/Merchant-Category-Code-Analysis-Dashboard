
import React from 'react';

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-lg shadow-lg text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mb-4"></div>
      <p className="text-lg font-semibold text-gray-200">{message}</p>
      <p className="text-sm text-gray-400">Please wait...</p>
    </div>
  );
};

export default Loader;
