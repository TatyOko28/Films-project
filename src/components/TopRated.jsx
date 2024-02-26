import axios from 'axios';
import React, { Fragment, useEffect, useContext, useState } from 'react';
import { AiFillPlayCircle, AiOutlineClose } from "react-icons/ai";
import { Container } from './NavBar';
import TrailerMovies from '../Trailers/TrailerMovies';
import NoImg from './images/NoImage.jpg';

function TopRated() {
    const { toggle, inputValue } = useContext(Container);
    const [moviesData, setMoviesData] = useState([]);
    const [trailer, setTrailer] = useState(true);
    const [movieTitle, setMovieTitle] = useState('');
    const ApiBase = 'https://api.themoviedb.org/3/';
    const apiKey = 'b90bd1a8562107f9151b62b107f49afc';
    const Images = 'https://image.tmdb.org/t/p/w500/';

    const MovieCall = async () => {
        try {
            const endpoint = inputValue ? 'search/movie' : 'movie/top_rated';
            const params = {
                api_key: apiKey,
                ...(inputValue && { query: inputValue })
            };
            const response = await axios.get(`${ApiBase}${endpoint}`, { params });
            setMoviesData(response.data.results);
        } catch (error) {
            console.error("Error fetching movie data:", error);
        }
    };

    useEffect(() => {
        MovieCall();
    }, [inputValue]);

    const handleMovieClick = (movie) => {
        setMovieTitle(movie.title);
        setTrailer(!trailer);
    };

    return (
        <Fragment>
            <div className={toggle ? "mainBgColor" : 'secondaryBgColor'}>
                <div className='movies-container'>
                    {moviesData.map((movie) => (
                        <Fragment key={movie.id}>
                            <div id={trailer ? 'container' : 'NoContainer'}>
                                <AiFillPlayCircle color='#fff' fontSize={40} id={trailer ? 'playIcon' : 'hide'} onClick={() => handleMovieClick(movie)} />
                                <img src={movie.poster_path ? `${Images}${movie.poster_path}` : NoImg} alt={movie.title} onClick={() => handleMovieClick(movie)} />
                                <h3 id={movie.title.length > 28 ? 'smaller-Text' :  ''} className={toggle ? 'mainColor' : 'secondaryColor'}>{movie.title}</h3>
                            </div>
                        </Fragment>
                    ))}
                    {!trailer && <TrailerMovies movieTitle={movieTitle} toggle={toggle} />}
                    {!trailer && <AiOutlineClose id={'Exit1'} className={toggle ? 'DarkTheme' : 'LightThemeClose'} fontSize={0} color='#fff' cursor={'pointer'} onClick={() => setTrailer(true)} />}
                </div>
            </div>
        </Fragment>
    );
}

export default TopRated;
