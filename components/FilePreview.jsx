import React from 'react';
import { File } from 'lucide-react';

export function FilePreview({ file }) {
  return (
    <div className="flex items-center bg-gray-100 p-2 rounded mt-2">
      <File className="h-4 w-4 mr-2" />
      <span className="text-sm">{file.name}</span>
    </div>
  );
}
