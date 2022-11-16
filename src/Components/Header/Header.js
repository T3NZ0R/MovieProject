import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {Route, NavLink, Routes, Outlet, useLocation} from "react-router-dom";

import {GenreBadge, SearchForm} from "../index";
import {MoviesGenrePage, MoviesListPage, WatchMovie, Home, Favourites, AboutUs} from "../../Pages";
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


        if (home) {
            switch (path) {
                case '/':
                    home.classList.add("activePage");
                    genre.style.color = 'unset';
                    genre.style.opacity = '0.6';
                    customHover();
                    break;
                case '/favourites':
                    favouritesPage.classList.add("activePage");
                    genre.style.color = 'unset';
                    genre.style.opacity = '0.6';
                    customHover();
                    break;
                case '/about-us':
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
                        <NavLink to={'/'} className={"link"} id={'home'}>Home</NavLink>
                        <GenreBadge clasName={"link"} id={'genre'}/>
                        <NavLink to={'/favourites'} className={"link"} id={'favourites'}>Favourites</NavLink>
                        <NavLink to={'/about-us'} className={"link"} id={'aboutUs'}>About us</NavLink>
                    </div>

                    <SearchForm/>
                </div>


                <Outlet/>


                <Routes>
                    <Route path={'/'} index element={<Home/>}/>

                    <Route path={'/upcoming'} element={<MoviesListPage/>}/>

                    <Route path={'/movie/:id'} element={<WatchMovie/>}/>

                    <Route path={'/top_rated'} element={<MoviesListPage/>}/>

                    <Route path={'/popular'} element={<MoviesListPage/>}/>

                    <Route path={'/now_playing'} element={<MoviesListPage/>}/>

                    <Route path={'/genre/:genre'} element={<MoviesGenrePage/>}/>

                    <Route path={'/favourites'} element={<Favourites/>}/>

                    <Route path={'/about-us'} element={<AboutUs/>}/>


                </Routes>
            </div>
        </div>

    );
};

export {Header};
