'use client';

import React from 'react';

const ReportSummary = () => {
  // This is mock data. In a real application, you would calculate these values based on actual report data
  const averageScore = 85;
  const totalReports = 10;
  const highestScore = 98;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Report Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-gray-600">Average Score</p>
          <p className="text-3xl font-bold">{averageScore}%</p>
        </div>
        <div>
          <p className="text-gray-600">Total Reports</p>
          <p className="text-3xl font-bold">{totalReports}</p>
        </div>
        <div>
          <p className="text-gray-600">Highest Score</p>
          <p className="text-3xl font-bold">{highestScore}%</p>
        </div>
      </div>
    </div>
  );
};

export default ReportSummary;
