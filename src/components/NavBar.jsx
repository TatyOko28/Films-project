import React, { Fragment, useState } from 'react';
import { HiSearch } from "react-icons/hi";
import { Routes, Route, NavLink } from 'react-router-dom';
import Movies from './Movies';
import TopRated from './TopRated';
import TvShows from './TvShows';
import Popular from './Popular';
import "../Styles/NavBarStyle.css";

export const Container = React.createContext();

function NavBar() {
    const [toggle, setToggle] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    return (
        <Container.Provider value={{ toggle, inputValue }}>
            <Fragment>
                <nav className={toggle ? '' : 'navBarColor'}>
                    <div className='nav-header'>
                        <h1 id={toggle ? '' : 'heading'}>MOVIES</h1>
                        <div className='hamburger-menu' onClick={() => setMenuOpen(!menuOpen)}>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className={`nav-options ${menuOpen ? 'open' : ''}`}>
                        <NavLink to="" style={({ isActive }) => ({ color: isActive ? '#fff' : '#EE9800' })}>
                            <span id={toggle ? 'Movies' : 'MoviesLight'}>Now Playing</span>
                        </NavLink>
                        <NavLink to="/Top Rated" style={({ isActive }) => ({ color: isActive ? '#fff' : '#EE9800' })}>
                            <span id={toggle ? 'Movies' : 'MoviesLight'}>Top Rated</span>
                        </NavLink>
                        <NavLink to="/Tv Shows" style={({ isActive }) => ({ color: isActive ? '#fff' : '#EE9800' })}>
                            <span id={toggle ? 'Movies' : 'MoviesLight'}>Tv Shows</span>
                        </NavLink>
                        <NavLink to="/Popular" style={({ isActive }) => ({ color: isActive ? '#fff' : '#EE9800' })}>
                            <span id={toggle ? 'Movies' : 'MoviesLight'}>Popular</span>
                        </NavLink>
                        <a href="https://bouesso-service.netlify.app/" className='Bouesso' rel="noopener noreferrer">Bouesso-Service</a>
                    </div>
                    <div className='input-group'>
                        <input type='text' placeholder='Search Whatever You Want' onChange={(e) => setInputValue(e.target.value)} />
                        <HiSearch fontSize={21} color='green' id='search' />
                        <div id='Color-switcher' onClick={() => setToggle(!toggle)}>
                            <div id={toggle ? 'Color-switcher-mover' : 'Color-switcher-moved'}></div>
                        </div>
                    </div>
                </nav>
                <Routes>
                    <Route path='' element={<Movies />} />
                    <Route path='Top Rated' element={<TopRated />} />
                    <Route path='Tv Shows' element={<TvShows />} />
                    <Route path='Popular' element={<Popular />} />
                </Routes>
            </Fragment>
        </Container.Provider>
    );
}

export default NavBar;
