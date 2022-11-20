import React from 'react';
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";

import {addMovieId} from "../../Store";
import {baseURLImg} from "../../Constants";

import './movieBadge.style.css';

const MovieBadge = ({movie}) => {

    let {title, id, poster_path, release_date} = movie;

    let year = release_date.substring(0, 4);

    const dispatch = useDispatch();

    let movieImg = baseURLImg + poster_path;


    return (
        <div>
            <div className={'movie'}>
                <img className={'movieImg'} src={movieImg} alt="movieImg"/>

                <NavLink className={'hoverCard'}
                         to={`/movie-project/movie/${id}`}
                         onClick={() => {
                             dispatch(addMovieId(id));
                             window.scrollTo(0, 0);
                         }}>
                    <div></div>
                </NavLink>


                <div className={'movieText'}>
                    <NavLink className={'movieLink'}
                             to={`/movie-project/movie/${id}`}
                             onClick={() => {
                                 dispatch(addMovieId(id));
                                 window.scrollTo(0, 0);
                             }}>
                        {title}</NavLink>
                    <p className="movieYear">{year}</p>
                </div>
            </div>
        </div>
    );
};

export {MovieBadge};
