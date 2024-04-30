import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Link, useParams } from "react-router-dom";

const MoviePage = () => {
  const { addMovieToWatchlist, watchlist, watched } = useContext(GlobalContext);
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.AUTH_KEY}`,
    },
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`,
          options
        );
        const data = await res.json();
        setDetails(data);
        console.log(data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchDetails();
  }, []);

  let storedMovie = details ? watchlist.find((o) => o.id === details.id) : null;
  let storedMovieWatched = details
    ? watched.find((o) => o.id === details.id)
    : null;

  const watchlistDisabled = storedMovie || storedMovieWatched ? true : false;

  return (
    <div className="movie-page-details">
      {details ? (
        details.title ? (
          <>
            <div
              className="movie-page-container"
              style={{
                backgroundImage:
                  "url(" +
                  `https://image.tmdb.org/t/p/original/${details.backdrop_path}` +
                  ")",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="cover"></div>
              <div className="container">
                <div className="poster-details-wrapper">
                  {details.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original/${details.poster_path}`}
                      alt={`${details.title} Poster`}
                    />
                  ) : (
                    <div className="filler-poster">Not Available</div>
                  )}
                </div>
                <div className="movie-page-content">
                  <h1 className="heading">{details.title}</h1>

                  <p>
                    {details.release_date
                      ? details.release_date.substring(0, 4)
                      : "-"}
                    <span className="imdb-rating">
                      IMDB: {details.vote_average}
                    </span>
                  </p>

                  <p>{details.overview}</p>
                  <p>Released: {details.release_date}</p>
                  <p>
                    Genre:{" "}
                    {details.genres
                      ? details.genres.map((genre) => (
                          <span key={genre.id}>{genre.name}</span>
                        ))
                      : "N/A"}
                  </p>
                  <p>Duration: {details.runtime} min</p>
                  <p>Country: {details.origin_country}</p>

                  <div className="controls">
                    <button
                      className="btn"
                      disabled={watchlistDisabled}
                      onClick={() => addMovieToWatchlist(details)}
                    >
                      Add Movie to watchlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="movie-page">
            <div className="container">
              <h2 className="no-movies">
                Unfortunately, the movie information is not available.
              </h2>
            </div>
          </div>
        )
      ) : null}
    </div>
  );
};

export default MoviePage;
