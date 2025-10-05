
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 shadow-md p-4">
      <div className="container mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold text-cyan-400">
          Merchant Category Code (MCC) Analysis Dashboard
        </h1>
      </div>
    </header>
  );
};

export default Header;
