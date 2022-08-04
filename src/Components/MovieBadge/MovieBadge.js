import React from 'react';
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";

import {addMovieId} from "../../Store";
import {baseURL_img} from "../../Constants";
import './movieBadge.style.css';

const MovieBadge = ({movie}) => {

    let {title, id, poster_path} = movie;

    const dispatch = useDispatch();

    let movieImg = baseURL_img + poster_path;


    return (
        <div>
            <div className={'movie'}>
                <img className={'movieImg'} src={movieImg} alt="movieImg"/>
                <button className={'movieButton'}><NavLink className={'movieLink'} to={`/movie/${id}`}
                                                           onClick={() => dispatch(addMovieId(id))}>{title}</NavLink>
                </button>
            </div>

        </div>

    );
};

export {MovieBadge};
