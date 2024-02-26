import React, { useState, useEffect, useContext, Fragment } from "react";
import { Container } from './NavBar';
import TrailerMovies from '../Trailers/TrailerMovies';
import { AiOutlineClose } from 'react-icons/ai';


const API_URL = "http://www.omdbapi.com?apikey=fe1fb1dc";

const TvShows = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [movieTitle, setMovieTitle] = useState("");
  const { toggle } = useContext(Container);

  useEffect(() => {
    searchMovies("Batman"); // Recherche initiale
  }, []);

  const searchMovies = async (title) => {
    if (!title) {
      console.log("Search term is empty");
      return;
    }

    console.log(`Searching for: ${title}`);
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    console.log("API response:", data);

    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]); // Aucun film trouvé pour cette recherche
    }
  };

  const handleMovieClick = (movie) => {
    setShowVideoModal(true);
    setMovieTitle(movie.Title);
  };

  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : 'secondaryBgColor'}>
        <div className='search-bar'>
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => searchMovies(searchTerm)}>Search</button>
        </div>
        <div className='movies-container'>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.imdbID} className="movie-card" onClick={() => handleMovieClick(movie)}>
                <img src={movie.Poster} alt={movie.Title} className="movie-image" />
                <div className="movie-title" onClick={(e) => e.stopPropagation()}>
                  {movie.Title}
                </div>
              </div>
            ))
          ) : (
            <div className="no-movies">
              No movies found
            </div>
          )}
        </div>
        {showVideoModal && (
          <div className="video-modal active" onClick={() => setShowVideoModal(false)}>
            <TrailerMovies movieTitle={movieTitle} toggle={toggle} />
            <AiOutlineClose onClick={() => setShowVideoModal(false)} />
          </div>   
        )}
      </div>
    </Fragment>
  );
};

export default TvShows;
