"use client";

export default function MovieCard({ movie }: { movie: any }) {
  return (
    <div className="bg-gray-800 rounded shadow overflow-hidden">
      {movie.poster && (
        <img src={movie.poster} alt={movie.title} className="w-full h-auto" />
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-white">{movie.title}</h2>
        <p className="text-gray-400 text-sm">{movie.year}</p>
      </div>
    </div>
  );
}
