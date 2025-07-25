const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function fetchMovieMetadata(title: string) {
  if (!TMDB_API_KEY) {
    console.warn("TMDB API Key not set");
    return null;
  }

  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
    title
  )}`;

  const response = await fetch(searchUrl);
  const data = await response.json();

  if (!data?.results?.length) return null;

  const movie = data.results[0];

  return {
    title: movie.title,
    year: movie.release_date?.split("-")[0] || "Unknown",
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null,
    genres: movie.genre_ids || [],
    runtime: movie.runtime || null,
  };
}
