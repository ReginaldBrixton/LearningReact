'use client';

import React from 'react';

const ReportItem = ({ report }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold">{report.title}</h3>
      <p className="text-gray-600">Date: {report.date}</p>
      <p className="text-gray-600">Score: {report.score}</p>
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        View Details
      </button>
    </div>
  );
};

export default ReportItem;
