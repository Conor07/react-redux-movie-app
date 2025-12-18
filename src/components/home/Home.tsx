import React, { useEffect, useState } from "react";
import MovieListing from "../MovieListing/MovieListing";
import useFetch from "../../common/hooks/usefetch";
import { fetchMovies } from "../../common/apis/api";

type HomeProps = {};

const Home: React.FC<HomeProps> = ({}) => {
  const {
    data: movies,
    loading,
    error,
    refetch: loadFilms,
    reset,
  } = useFetch(() => fetchMovies({ searchQuery: undefined }), true);

  console.log("movies: ", movies);

  return (
    <div className="Home">
      {error && <div className="Error">There has been an error</div>}

      <div className="BannerImg">Home</div>

      <MovieListing />
    </div>
  );
};

export default Home;
