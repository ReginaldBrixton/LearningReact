import React from 'react';
import Link from 'next/link';
import { Home, Film } from 'lucide-react';

export default function NotFound() {
  return (
    <div className=" flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="text-center bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full">
        <Film className="mx-auto text-blue-500 mb-4" size={64} />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Oops! It seems like the scene you&apos;re looking for has been cut from our reel. 
          Let&apos;s get you back to the main feature!
        </p>
        <Link href="/" className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
          <Home className="mr-2" size={20} />
          Back to Home
        </Link>
      </div>
    </div>

  );
  
}