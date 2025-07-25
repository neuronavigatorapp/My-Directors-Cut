"use client";

import { ChangeEvent } from "react";
import Papa from "papaparse";

interface UploadProps {
  onUpload: (csv: string[][]) => void;
}

export default function Upload({ onUpload }: UploadProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (results) => {
        if (results.data && Array.isArray(results.data)) {
          onUpload(results.data as string[][]);
        }
      },
    });
  };

  return (
    <div className="text-center">
      <label className="block mb-4 text-gray-300 font-medium">Upload your movie CSV:</label>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="bg-gray-900 text-white px-4 py-2 rounded border border-gray-700"
      />
    </div>
  );
}
