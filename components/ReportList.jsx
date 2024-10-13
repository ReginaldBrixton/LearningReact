'use client';

import React from 'react';
import ReportItem from './ReportItem';

const ReportList = () => {
  // This is a mock data array. In a real application, you would fetch this data from an API
  const reports = [
    { id: 1, title: 'Midterm Exam', date: '2023-04-15', score: 85 },
    { id: 2, title: 'Final Project', date: '2023-05-20', score: 92 },
    { id: 3, title: 'Quiz 3', date: '2023-03-10', score: 78 },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Recent Reports</h2>
      <div className="space-y-4">
        {reports.map((report) => (
          <ReportItem key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
};

export default ReportList;
