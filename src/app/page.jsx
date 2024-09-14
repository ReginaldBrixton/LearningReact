import React from 'react';
import Sidebar from '../components/sidebar';

const HomePage = () => {
  return (
    <div className="poppins flex">
      {/* Sidebar with fixed width */}
      <div className="w-[4rem]">
        <Sidebar />
      </div>

      {/* Main content that grows */}
      <main className="flex-grow p-8">
        <h1>Hello World</h1>
      </main>
      
    </div>
  );
};

export default HomePage;
