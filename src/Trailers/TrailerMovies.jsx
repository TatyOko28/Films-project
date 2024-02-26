import React, { Fragment, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';
import "../Styles/NavBarStyle.css";

function TrailerMovies({ movieTitle, toggle }) { // Renamed MoviesTitle to movieTitle for clarity
  const [videoURL, setVideoUrl] = useState('');

  useEffect(() => {
    async function fetchTrailer() {
      try {
        if (movieTitle) {
          const url = await movieTrailer(movieTitle);
          setVideoUrl(url);
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    }

    fetchTrailer();
  }, [movieTitle]); // Depend on movieTitle

  return (
    <Fragment>
      <div className='Container'>
      </div>  
      <div className='player'>
        <h1 id={toggle ? 'TrailerMovie-name-dark' : 'TrailerMovie-name-light'}>{movieTitle}</h1> {/* Use movieTitle directly */}
        <ReactPlayer url={videoURL} controls={true} width={'800px'} height={'500px'} muted={false} />
      </div>
    </Fragment>
  );
}

export default TrailerMovies;
