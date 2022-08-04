import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {addTypeOfMovies, getMovieList} from "../../Store";
import {MovieBadge} from "../";
import {urls} from "../../Constants";
import './type.style.css';

const NowPlaying = () => {

    let {nowPlaying} = useSelector(state => state['movieListReducer']);

    let movies = nowPlaying.slice(0, 4);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovieList(urls.nowPlaying));
    }, [dispatch]);

    return (
        <div>

            <div className={'typeTitle'}>
                <span className={'type'}>Now playing</span>
                <Link className={'typeLink'} to={'/now_playing'}
                      onClick={() => dispatch(addTypeOfMovies(urls.nowPlaying))}>See all</Link>
            </div>
            <div className={'movies'}>
                {movies.map(value => <MovieBadge key={value.id} movie={value}/>)}
            </div>

        </div>
    );
};

export {NowPlaying};
