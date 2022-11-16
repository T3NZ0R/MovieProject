import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {Route, NavLink, Routes, Outlet, useLocation} from "react-router-dom";

import {GenreBadge, SearchForm} from "../index";
import {MoviesGenrePage, MoviesListPage, WatchMovie, Home, Favourites, AboutUs, NoInfo} from "../../Pages";
import {addSessionId} from "../../Store";
import 'bootstrap/dist/css/bootstrap.css';
import './header.style.css';
import logo from '../../img/Group.svg';



const Header = () => {

    const dispatch = useDispatch();

    let path = useLocation().pathname;

    useEffect(() => {
        dispatch(addSessionId);

        let home = document.getElementById('home');
        let favouritesPage = document.getElementById('favourites');
        let genre = document.getElementById('genre');
        let aboutUs = document.getElementById('aboutUs');

        let customHover = () =>{
            genre.addEventListener('mouseenter', () =>{
                genre.style.color = '#85CFCB';
                genre.style.opacity = 'unset';
            });

            genre.addEventListener('mouseleave', () =>{
                genre.style.color = '#fff';
                genre.style.opacity = '0.6';
            });
        }

        console.log(path);

        if (home) {
            switch (path) {
                case '/movie-project/':
                    home.classList.add("activePage");
                    genre.style.color = 'unset';
                    genre.style.opacity = '0.6';
                    customHover();
                    break;
                case '/movie-project/favourites':
                    favouritesPage.classList.add("activePage");
                    genre.style.color = 'unset';
                    genre.style.opacity = '0.6';
                    customHover();
                    break;
                case '/movie-project/about-us':
                    aboutUs.classList.add("activePage");
                    genre.style.color = 'unset';
                    genre.style.opacity = '0.6';
                    customHover();
                    break;
                default:
                    genre.style.color = '#219897';
                    genre.style.opacity = 'unset';
                    break;
            }
        }
    }, [dispatch, path]);

    return (

        <div className={"headerWrap"}>
            <div className={'header'}>

                <div className={"links"}>

                    <div className={'categories'}>
                        <div className={'logoImg'}>
                            <img src={logo} alt="Logo"/>
                        </div>
                        <NavLink to={'movie-project/'} className={"link"} id={'home'}>Home</NavLink>
                        <GenreBadge clasName={"link"} id={'genre'}/>
                        <NavLink to={'movie-project/favourites'} className={"link"} id={'favourites'}>Favourites</NavLink>
                        <NavLink to={'movie-project/about-us'} className={"link"} id={'aboutUs'}>About us</NavLink>
                    </div>

                    <SearchForm/>
                </div>


                <Outlet/>


                <Routes>
                    <Route path={'movie-project/'} index element={<Home/>}/>

                    <Route path={'movie-project/upcoming'} element={<MoviesListPage/>}/>

                    <Route path={'movie-project/movie/:id'} element={<WatchMovie/>}/>

                    <Route path={'movie-project/top_rated'} element={<MoviesListPage/>}/>

                    <Route path={'movie-project/popular'} element={<MoviesListPage/>}/>

                    <Route path={'movie-project/now_playing'} element={<MoviesListPage/>}/>

                    <Route path={'movie-project/genre/:genre'} element={<MoviesGenrePage/>}/>

                    <Route path={'movie-project/favourites'} element={<Favourites/>}/>

                    <Route path={'movie-project/about-us'} element={<AboutUs/>}/>

                    <Route path={'*'} element={<NoInfo/>}/>


                </Routes>
            </div>
        </div>

    );
};

export {Header};
