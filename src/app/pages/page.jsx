import React from 'react';
import Sidebar from '../../components/sidebar';

const AllProjectsPage = () => {
  return (
    <div className="poppins flex">
      <Sidebar />
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-6">All Projects</h1>
        <p className="text-lg text-gray-600">Welcome to the All Projects page. Here you can view and manage all your projects.</p>
        {/* Add more content for the All Projects page here */}
      </main>
    </div>
  );
};

export default AllProjectsPage;
