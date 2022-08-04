import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {addTypeOfMovies, getMovieList} from "../../Store";
import {MovieBadge} from "../";
import {urls} from "../../Constants";

const Popular = () => {

    let {popular} = useSelector(state => state['movieListReducer']);

    let movies = popular.slice(0, 4);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovieList(urls.popular));
    }, [dispatch]);

    return (
        <div>
            <div className={'typeTitle'}>
                <span className={'type'}>Popular</span>
                <Link to={'/popular'} onClick={() => dispatch(addTypeOfMovies(urls.popular))}>See all</Link>
            </div>

            <div className={'movies'}>
                {movies.map(value => <MovieBadge key={value.id} movie={value}/>)}
            </div>

        </div>
    );
};

export {Popular};
