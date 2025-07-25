"use client";

import { useState } from "react";

export default function MovieFilterPanel({ onFilter }: { onFilter: (filters: { genre: string; decade: string; runtime: string }) => void }) {
  const [genre, setGenre] = useState("All");
  const [decade, setDecade] = useState("All");
  const [runtime, setRuntime] = useState("All");

  return (
    <div className="space-y-4 bg-gray-900 p-4 rounded border border-gray-700">
      <div>
        <label className="block text-sm text-gray-400 mb-1">Genre</label>
        <select value={genre} onChange={e => setGenre(e.target.value)} className="w-full bg-gray-800 text-white p-2 rounded">
          <option>All</option>
          <option>Action</option>
          <option>Comedy</option>
          <option>Drama</option>
          <option>Horror</option>
        </select>
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-1">Decade</label>
        <select value={decade} onChange={e => setDecade(e.target.value)} className="w-full bg-gray-800 text-white p-2 rounded">
          <option>All</option>
          <option>1980s</option>
          <option>1990s</option>
          <option>2000s</option>
          <option>2010s</option>
          <option>2020s</option>
        </select>
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-1">Runtime</label>
        <select value={runtime} onChange={e => setRuntime(e.target.value)} className="w-full bg-gray-800 text-white p-2 rounded">
          <option>All</option>
          <option>Short (&lt;90)</option>
          <option>Medium (90–120)</option>
          <option>Long (&gt;120)</option>
        </select>
      </div>
      <button
        onClick={() => onFilter({ genre, decade, runtime })}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Apply Filters
      </button>
    </div>
  );
}
