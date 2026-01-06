import React from "react";
import { useSelector } from "react-redux";
import {
  getAllMovies,
  getAllShows,
  getMoviesError,
  getMoviesLoading,
  type Movie,
  type Show,
} from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import "./movieListing.scss";

type MovieListingProps = {};

const MovieListing: React.FC<MovieListingProps> = ({}) => {
  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);

  let renderedMovies,
    renderedShows = null;

  renderedMovies = movies ? (
    movies.map((movie: Movie, idx: number) => {
      return <MovieCard key={idx} movieData={movie} />;
    })
  ) : (
    <div className="MoviesError">
      <h3>No movies found</h3>
    </div>
  );

  renderedShows = shows ? (
    shows.map((show: Show, idx: number) => {
      return <MovieCard key={idx} showData={show} />;
    })
  ) : (
    <div className="ShowsError">
      <h3>No shows found</h3>
    </div>
  );

  const moviesLoading = useSelector(getMoviesLoading);

  const moviesError = useSelector(getMoviesError);

  const showsLoading = useSelector(getMoviesLoading);

  const showsError = useSelector(getMoviesError);

  return (
    <div className="MovieListing">
      <div className="MovieList">
        <h2>Movies</h2>

        <div className="MovieContainer">
          {renderedMovies && !moviesLoading && !moviesError && renderedMovies}

          {moviesLoading && (
            <div className="MoviesLoading">
              <h3>Loading movies...</h3>
            </div>
          )}

          {moviesError && (
            <div className="MoviesError">
              <h3>Error loading movies: {moviesError.message}</h3>
            </div>
          )}
        </div>
      </div>

      <div className="ShowList">
        <h2>Shows</h2>

        <div className="ShowContainer">
          {renderedShows && !showsLoading && !showsError && renderedShows}

          {showsLoading && (
            <div className="ShowsLoading">
              <h3>Loading shows...</h3>
            </div>
          )}

          {showsError && (
            <div className="ShowsError">
              <h3>Error loading shows: {showsError.message}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieListing;
