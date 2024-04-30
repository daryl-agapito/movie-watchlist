import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const { watchlist } = useContext(GlobalContext);

  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">My Watch List</h1>
        </div>

        {watchlist.length > 0 ? (
          <div className="movie-grid">
            {watchlist.map((movie) => (
              <MovieCard id={movie.id} movie={movie} type="watchlist" />
            ))}
          </div>
        ) : (
          <div className="home-div">
            <h2 className="no-movies">No movies in your watch list.</h2>
            <Link to="/add" className="btn">
              Add Movies
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
