import React from "react";
import { useSelector } from "react-redux";
import { getAllMovies, type Movie } from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import "./movieListing.scss";

type MovieListingProps = {};

const MovieListing: React.FC<MovieListingProps> = ({}) => {
  const movies = useSelector(getAllMovies);

  let renderedMovies = "";

  renderedMovies = movies ? (
    movies.map((movie: Movie, idx: number) => {
      return <MovieCard key={idx} data={movie} />;
    })
  ) : (
    <div className="MoviesError">
      <h3>{movies?.error ?? "No movies found"}</h3>
    </div>
  );

  return (
    <div className="MovieListing">
      <div className="MovieList">
        <h2>Movies</h2>

        <div className="MovieContainer">{renderedMovies}</div>
      </div>
    </div>
  );
};

export default MovieListing;
