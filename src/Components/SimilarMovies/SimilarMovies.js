import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {getMovieList} from "../../Store";
import {MovieBadge} from "../";
import {urls} from "../../Constants";
import './SimilarMovies.style.css';

const SimilarMovies = () => {

    let {similarMovies} = useSelector(state => state['movieListReducer']);

    let movies = similarMovies.slice(0, 4);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovieList(urls.nowPlaying));
    }, [dispatch]);

    return (
        <div>

            <div className={'typeTitle'}>
                <span className={'type'}>Recommended</span>
            </div>
            <div className={'movies'}>
                {movies.map(value => <MovieBadge key={value.id} movie={value}/>)}
            </div>

        </div>
    );
};

export {SimilarMovies};
