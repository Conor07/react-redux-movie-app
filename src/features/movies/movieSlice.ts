import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovies, fetchShows } from "../../common/apis/api";
import type { RootState } from "../store";

export const fetchAsyncMovies = createAsyncThunk<
  Movie[],
  void,
  { rejectValue: string }
>("movies/fetchAsyncMovies", async (_, { rejectWithValue }) => {
  try {
    const results = await fetchMovies({ searchQuery: undefined });
    return (results || []) as Movie[];
  } catch (err) {
    return rejectWithValue("Failed to fetch movies");
  }
});

export const fetchAsyncShows = createAsyncThunk<Show[]>(
  "movies/fetchAsyncShows",
  async (_, { rejectWithValue }) => {
    try {
      const results = await fetchShows({ searchQuery: undefined });
      return results || [];
    } catch (err) {
      return rejectWithValue("Failed to fetch shows");
    }
  }
);

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type Show = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
};

type InitialState = {
  movies: Movie[];
  moviesLoading: boolean;
  moviesError: Error | null;
  shows: Show[];
  showsLoading: boolean;
  showsError: Error | null;
};

const initialState: InitialState = {
  movies: [],
  moviesLoading: false,
  moviesError: null,
  shows: [],
  showsLoading: false,
  showsError: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncMovies.pending, (state) => {
      state.moviesLoading = true;
      state.moviesError = null;
    });

    builder.addCase(fetchAsyncMovies.fulfilled, (state, action) => {
      state.moviesLoading = false;
      state.movies = action.payload || [];
      state.moviesError = null;
    });

    builder.addCase(fetchAsyncMovies.rejected, (state, action) => {
      state.moviesLoading = false;
      state.moviesError = new Error("Failed to get movies");
      state.movies = [];
    });

    builder.addCase(fetchAsyncShows.pending, (state) => {
      state.showsLoading = true;
      state.showsError = null;
    });

    builder.addCase(fetchAsyncShows.fulfilled, (state, action) => {
      state.showsLoading = false;
      state.shows = action.payload || [];
      state.showsError = null;
    });

    builder.addCase(fetchAsyncShows.rejected, (state, action) => {
      state.showsLoading = false;
      state.showsError = new Error("Failed to get shows");
      state.shows = [];
    });
  },
});

export const getAllMovies = (state: RootState) => state.movies.movies;

export const getMoviesLoading = (state: RootState) =>
  state.movies.moviesLoading;

export const getMoviesError = (state: RootState) => state.movies.moviesError;

export const getAllShows = (state: RootState) => state.movies.shows;

export const getShowsLoading = (state: RootState) => state.movies.showsLoading;

export const getShowsError = (state: RootState) => state.movies.showsError;

export default movieSlice.reducer;
