import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";
import useFetch from "../../common/hooks/usefetch";
import { fetchMovies } from "../../common/apis/api";
import { useDispatch } from "react-redux";
import { addMovies } from "../../features/movies/movieSlice";

type HomeProps = {};

const Home: React.FC<HomeProps> = ({}) => {
  const {
    data: movies,
    loading,
    error,
    refetch: loadFilms,
    reset,
  } = useFetch(() => fetchMovies({ searchQuery: undefined }), true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (movies) dispatch(addMovies(movies));
  }, [movies, dispatch]);

  return (
    <div className="Home">
      {error && <div className="Error">There has been an error</div>}

      <div className="BannerImg">Home</div>

      <MovieListing />
    </div>
  );
};

export default Home;
