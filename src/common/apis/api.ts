import axios from "axios";

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
};

export const fetchMovies = async ({
  searchQuery,
}: {
  searchQuery?: string;
}) => {
  const endpoint = searchQuery
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
        searchQuery
      )}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await axios.get(endpoint, {
    headers: TMDB_CONFIG.headers,
  });

  if (!response.data) throw new Error("Failed to fetch movies");

  return response.data.results;
};
