import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {Route, NavLink, Routes, Outlet} from "react-router-dom";

import {GenreBadge, SearchForm} from "../index";
import {MoviesGenrePage, MoviesListPage, WatchMovie, Home} from "../../Pages";
import {addSessionId} from "../../Store";
import 'bootstrap/dist/css/bootstrap.css';
import './header.style.css';


const Header = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addSessionId);
    }, [dispatch]);

    return (

        <div className={'header'}>
            <div className={"links"}>
                <div className={'categories'}>
                    <NavLink to={'/'} className={"link"}>Home</NavLink>
                    <GenreBadge clasName={"link"}/>
                    <NavLink to={'/country'} className={"link"}>Country</NavLink>
                    <NavLink to={'/tv'} className={"link"}>TV</NavLink>
                    <NavLink to={'/anime'} className={"link"}>Anime</NavLink>
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

                <Route path={'/country'} element={<Home/>}/>

                <Route path={'/tv'} element={<Home/>}/>

                <Route path={'/anime'} element={<Home/>}/>

            </Routes>
        </div>
    );
};

export {Header};
