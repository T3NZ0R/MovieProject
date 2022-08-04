import React from 'react';
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import {Rating} from "react-simple-star-rating";

import {addMovieId} from "../../Store";
import {baseURL_img} from "../../Constants";
import './movieInfo.style.css';

const MovieInfo = ({movie}) => {

    let {title, id, poster_path, overview, vote_average} = movie;

    const dispatch = useDispatch();

    let movieImg = baseURL_img + poster_path;

    return (
        <div className={'movieItem'}>
            <div>
                <img className={'moviePhoto'} src={movieImg} alt="movieImg"/>
            </div>
            <div className={'movieElement'}>
                <div className={'movieElementTitle'}>
                    {title}
                </div>
                <div className={'movieElementOverview'}>
                    {overview}
                </div>
                <div className={"starsRating"}>
                    <Rating ratingValue={vote_average * 10} iconsCount={10} readonly={true} fillColor={"#00C2FF"}/>
                </div>
                <button className={'movieElementButton'}><NavLink className={'movieElementLink'} to={`/movie/${id}`}
                                                                  onClick={() => dispatch(addMovieId(id))}>Watch
                    film</NavLink>
                </button>
            </div>
        </div>
    );
};

export {MovieInfo};
