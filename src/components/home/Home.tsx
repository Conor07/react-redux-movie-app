import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";
import { useDispatch } from "react-redux";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";
import type { AppDispatch } from "../../features/store";

type HomeProps = {};

const Home: React.FC<HomeProps> = ({}) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAsyncMovies());

    dispatch(fetchAsyncShows());
  }, [dispatch]);

  return (
    <div className="Home">
      <div className="BannerImg">Home</div>

      <MovieListing />
    </div>
  );
};

export default Home;
