import React from "react";
import type { Movie } from "../../features/movies/movieSlice";
import "./movieCard.scss";

type MovieCardProps = {
  data: Movie;
};

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const formattedDate = data.release_date
    ? new Date(data.release_date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="MovieCard">
      <div className="MovieCardInner">
        <div className="CardTop">
          <img
            src={
              data.poster_path
                ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={data.title}
          />
        </div>

        <div className="CardBottom">
          <div className="CardInfo">
            <h3>{data.title}</h3>

            <p>Release Date: {formattedDate}</p>

            <p>Rating: {data.vote_average ?? "-"} / 10</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
