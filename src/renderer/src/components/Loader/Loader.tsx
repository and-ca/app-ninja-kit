import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent">
      <div className="loader border-t-transparent border-4 border-white-500 rounded-full w-12 h-12 animate-spin"></div>
    </div>
  );
};

export default Loader;