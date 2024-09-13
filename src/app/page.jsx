import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <main className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">Welcome to Our Website</h1>
        <p className="mb-6 text-gray-600">
          We're excited to have you here! Explore our site to discover amazing content and features.
        </p>
        
      </main>
    </div>
  );
};

export default HomePage;