import React from 'react';

function loading() {
  return (
    <div className="flex gap-2 items-center justify-center min-h-full min-w-full fixed top-0">
      <div className="w-5 h-5 rounded-full animate-pulse-fast bg-blue-600" />
      <div className="w-5 h-5 rounded-full animate-pulse-fast bg-blue-600" />
      <div className="w-5 h-5 rounded-full animate-pulse-fast bg-blue-600" />
    </div>
  );
}

export default loading;
