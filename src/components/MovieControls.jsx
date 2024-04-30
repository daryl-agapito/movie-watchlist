import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";

const MovieControls = ({ movie, type }) => {
  const {
    removeMovieFromWatchlist,
    addMoviesToWatched,
    moveToWatchList,
    removeFromWatched,
  } = useContext(GlobalContext);

  return (
    <>
      {type === "watchlist" && (
        <div className="inner-card-controls">
          <button
            className="ctrl-btn"
            onClick={() => addMoviesToWatched(movie)}
          >
            <i className="fa-fw far fa-eye"></i>
          </button>

          <Link to={`/${movie.id}`} className="ctrl-btn">
            <i className="fa fa-info-circle"></i>
          </Link>

          <button
            className="ctrl-btn"
            onClick={() => removeMovieFromWatchlist(movie.id)}
          >
            <i className="fa-fw fas fa-times"></i>
          </button>
        </div>
      )}

      {type === "watched" && (
        <div className="inner-card-controls">
          <button className="ctrl-btn" onClick={() => moveToWatchList(movie)}>
            <i className="fa-fw far fa-eye-slash"></i>
          </button>

          <Link to={`/${movie.id}`} className="ctrl-btn">
            <i className="fa fa-info-circle"></i>
          </Link>

          <button
            className="ctrl-btn"
            onClick={() => removeFromWatched(movie.id)}
          >
            <i className="fa-fw fas fa-times"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default MovieControls;
