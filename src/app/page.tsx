"use client";

import { useEffect, useState } from "react";
import Upload from "@/components/Upload";
import MovieCard from "@/components/MovieCard";
import MovieFilterPanel from "@/components/MovieFilterPanel";
import SurpriseMe from "@/components/SurpriseMe";
import { fetchMovieMetadata } from "@/lib/tmdb";

export default function Home() {
  const [rawCsv, setRawCsv] = useState<string[][]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!rawCsv.length) return;
    const titles = rawCsv.slice(1).map((row) => row[0]);

    const fetchAll = async () => {
      setLoading(true);
      const results = await Promise.all(
        titles.map(async (title) => {
          const metadata = await fetchMovieMetadata(title);
          return (
            metadata || {
              title,
              poster: null,
              year: "Unknown",
              genres: [],
              runtime: null,
            }
          );
        })
      );
      setMovies(results);
      setFilteredMovies(results);
      setLoading(false);
    };

    fetchAll();
  }, [rawCsv]);

  const applyFilters = (filters: {
    genre: string;
    decade: string;
    runtime: string;
  }) => {
    const { genre, decade, runtime } = filters;

    const decadeRanges: Record<string, [number, number]> = {
      "1950s": [1950, 1960],
      "1960s": [1960, 1970],
      "1970s": [1970, 1980],
      "1980s": [1980, 1990],
      "1990s": [1990, 2000],
      "2000s": [2000, 2010],
      "2010s": [2010, 2020],
      "2020s": [2020, 2030],
    };

    const result = movies.filter((movie) => {
      const movieYear = parseInt(movie.year);
      const movieRuntime = movie.runtime || 0;

      const matchesGenre = genre === "All" || movie.genres?.includes(genre);

      const matchesDecade =
        decade === "All" ||
        (decade === "Older" && movieYear < 1950) ||
        (decadeRanges[decade] &&
          movieYear >= decadeRanges[decade][0] &&
          movieYear < decadeRanges[decade][1]);

      const matchesRuntime =
        runtime === "All" ||
        (runtime.includes("Short") && movieRuntime < 90) ||
        (runtime.includes("Medium") && movieRuntime >= 90 && movieRuntime <= 120) ||
        (runtime.includes("Long") && movieRuntime > 120);

      return matchesGenre && matchesDecade && matchesRuntime;
    });

    setFilteredMovies(result);
  };

  return (
    <main className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-white mb-6">
        My Director’s Cut
      </h1>
      <p className="text-center text-gray-400 mb-8">
        Upload your movie CSV, tag your favorites, and rediscover your film
        collection like a home theater experience.
      </p>

      <Upload onUpload={setRawCsv} />

      {loading && (
        <p className="text-center text-sm text-gray-500 mt-6">
          Fetching movie data...
        </p>
      )}

      {!loading && movies.length > 0 && (
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <div className="w-full md:w-1/3">
            <MovieFilterPanel onFilter={applyFilters} />
          </div>

          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredMovies.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
              ))}
            </div>

            <div className="mt-6">
              <SurpriseMe
                onSelect={() => {
                  const sample = [...filteredMovies]
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3);
                  setFilteredMovies(sample);
                }}
                disabled={filteredMovies.length === 0}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
