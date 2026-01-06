import { createSlice } from "@reduxjs/toolkit";

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

type InitialState = {
  movies: Movie[];
};

const initialState: InitialState = {
  movies: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies(state, action) {
      state.movies = action.payload;
    },
  },
});

export const { addMovies } = movieSlice.actions;

export const getAllMovies = (state: any) => state.movies.movies;

export default movieSlice.reducer;
