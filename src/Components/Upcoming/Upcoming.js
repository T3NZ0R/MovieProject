import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

import {addTypeOfMovies, getMovieList} from "../../Store";
import {MovieBadge} from "../";
import {urls} from "../../Constants";
import '../NowPlaying/type.style.css'

const Upcoming = () => {

    let {upcoming} = useSelector(state => state['movieListReducer']);

    let movies = upcoming.slice(0, 4);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovieList(urls.upcoming));
    }, [dispatch]);

    return (
        <div>
            <div className={'typeTitle'}>
                <span className={'type'}>Upcoming</span>
                <button className={"seeAllButton"}>
                    <NavLink className={"typeLink"} to={'/upcoming'} onClick={() => dispatch(addTypeOfMovies(urls.upcoming))}>See all</NavLink>
                </button>

            </div>
            <div className={'movies'}>
                {movies.map(value => <MovieBadge key={value.id} movie={value}/>)}
            </div>
        </div>
    );
};

export {Upcoming};
