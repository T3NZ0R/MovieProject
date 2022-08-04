import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {addTypeOfMovies, getMovieList} from "../../Store";
import {MovieBadge} from "../";
import {urls} from "../../Constants";

const TopRated = () => {

    let {topRated} = useSelector(state => state['movieListReducer']);

    let movies = topRated.slice(0, 4);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovieList(urls.topRated));
    }, [dispatch]);

    return (
        <div>
            <div className={'typeTitle'}>
                <span className={'type'}>Top rated</span>
                <Link to={'/top_rated'} onClick={() => dispatch(addTypeOfMovies(urls.topRated))}>See all</Link>
            </div>

            <div className={'movies'}>
                {movies.map(value => <MovieBadge key={value.id} movie={value}/>)}
            </div>

        </div>
    );
};

export {TopRated};
