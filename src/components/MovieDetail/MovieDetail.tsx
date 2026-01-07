import "./movieDetail.scss";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../features/store";
import type { Movie, Show } from "../../features/movies/movieSlice";
import { useParams } from "react-router-dom";
import {
  clearMovieOrShowDetails,
  fetchAsyncMovieOrShowDetails,
  getDetails,
  getDetailsError,
  getDetailsLoading,
} from "../../features/movies/movieSlice";

type MovieDetailProps = {};

const MovieDetail: React.FC<MovieDetailProps> = ({}) => {
  const { isMovie, id } = useParams<{ id: string; isMovie: string }>();

  const dispatch = useDispatch<AppDispatch>();

  const details = useSelector(getDetails);

  const detailsLoading = useSelector(getDetailsLoading);

  const detailsError = useSelector(getDetailsError);

  useEffect(() => {
    const parsedId = id ? parseInt(id, 10) : null;

    if (parsedId && !detailsLoading && (!details || details.id !== parsedId)) {
      dispatch(
        fetchAsyncMovieOrShowDetails({
          id: parsedId,
          isMovie: isMovie === "movie",
        })
      );
    }

    return () => {
      dispatch(clearMovieOrShowDetails());
    };
  }, [dispatch, id, isMovie]);

  const isMovieDetails = (d: Movie | Show | null): d is Movie => {
    return !!d && Object.prototype.hasOwnProperty.call(d, "title");
  };

  const parsedDetails = details
    ? isMovieDetails(details)
      ? {
          title: details.title,
          releaseDate: new Date(details.release_date).toLocaleDateString(
            undefined,
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          ),
          posterPath: details.poster_path,
          overview: details.overview,
          voteAverage: details.vote_average,
          runtime: details.runtime,
        }
      : {
          title: details.name,
          releaseDate: new Date(details.first_air_date).toLocaleDateString(
            undefined,
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          ),
          posterPath: details.poster_path,
          overview: details.overview,
          voteAverage: details.vote_average,
          numberOfEpisodes: details.number_of_episodes,
          numberOfSeasons: details.number_of_seasons,
        }
    : null;

  return (
    <div className="MovieDetails">
      {detailsLoading && <p className="MovieDetailsLoading">Loading...</p>}

      {detailsError && (
        <p className="MovieDetailsError">Error: {detailsError.message}</p>
      )}

      {!detailsLoading && !detailsError && parsedDetails && (
        <div className="DetailsContainer">
          <h2>{parsedDetails.title}</h2>

          <img
            src={
              parsedDetails.posterPath
                ? `https://image.tmdb.org/t/p/w500${parsedDetails.posterPath}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={parsedDetails.title}
          />

          <p>{parsedDetails.overview}</p>

          <p>
            <strong>Release Date:</strong> {parsedDetails.releaseDate}
          </p>

          <p>
            <strong>Rating:</strong> {parsedDetails.voteAverage} / 10
          </p>

          {isMovieDetails(details) ? (
            <p>
              <strong>Runtime:</strong> {parsedDetails.runtime} minutes
            </p>
          ) : (
            <>
              <p>
                <strong>Number of Seasons:</strong>{" "}
                {parsedDetails.numberOfSeasons}
              </p>

              <p>
                <strong>Number of Episodes:</strong>{" "}
                {parsedDetails.numberOfEpisodes}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
