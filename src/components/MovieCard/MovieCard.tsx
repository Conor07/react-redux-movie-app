import React from "react";
import type { Movie, Show } from "../../features/movies/movieSlice";
import "./movieCard.scss";

type MovieCardProps = {
  movieData?: Movie;
  showData?: Show;
};

const MovieCard: React.FC<MovieCardProps> = ({ movieData, showData }) => {
  const formattedDate =
    movieData && movieData.release_date
      ? new Date(movieData.release_date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : showData && showData.first_air_date
      ? new Date(showData.first_air_date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "N/A";

  const title = movieData ? movieData.title : showData ? showData.name : "N/A";

  const posterPath = movieData
    ? movieData.poster_path
    : showData
    ? showData.poster_path
    : null;

  const voteAverage = movieData
    ? movieData.vote_average
    : showData
    ? showData.vote_average
    : null;

  return (
    <div className="MovieCard">
      <div className="MovieCardInner">
        <div className="CardTop">
          <img
            src={
              posterPath
                ? `https://image.tmdb.org/t/p/w500${posterPath}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={title}
          />
        </div>

        <div className="CardBottom">
          <div className="CardInfo">
            <h3>{title}</h3>

            <p>
              {movieData ? "Release Date" : "First Air Date"}: {formattedDate}
            </p>

            <p>Rating: {voteAverage ?? "-"} / 10</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
