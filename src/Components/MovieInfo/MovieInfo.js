import React from 'react';
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import {Rating} from "react-simple-star-rating";

import {addMovieId} from "../../Store";
import {baseURLImg} from "../../Constants";
import './movieInfo.style.css';

import calendarIcon from '../../img/calendarItem.png';
import worldIcon from '../../img/worldItem.png';

const MovieInfo = ({movie}) => {

    let {title, id, poster_path, overview, vote_average, release_date, original_language} = movie;

    const dispatch = useDispatch();

    let movieImg = baseURLImg + poster_path;

    release_date = release_date.replaceAll("-","/");

    return (
        <div className={'movieItem'}>
            <div className={"moviePhotoWrap"}>
                <img className={'moviePhoto'} src={movieImg} alt="movieImg"/>
            </div>
            <div className={'movieElement'}>
                <div className={'movieElementTitle'}>
                    {title}
                </div>
                <div className={'movieElementOverview'}>
                    {overview !== ''? overview : 'We can\'t provide a short description for this movie yet.'}
                </div>
                <div className={'movieElementReleaseDate'}>
                    <span className={"icon"}><img src={calendarIcon} alt={"icon"}/></span>
                    {release_date}
                </div>
                <div className={'movieElementLanguage'}>
                    <span className={"icon"}><img src={worldIcon} alt={"icon"}/></span>
                    {original_language.toUpperCase()}
                </div>

                <div className={"movieElementBottomWrap"}>
                    <div className={"starsRating"}>
                        <Rating ratingValue={vote_average * 10}
                                iconsCount={10}
                                readonly={true}
                                fillColor={"#85CFCB"}
                                emptyColor={"#496767"}/>
                    </div>
                    <button className={'movieElementButton'}><NavLink className={'movieElementLink'} to={`/movie/${id}`}
                                                                      onClick={() => dispatch(addMovieId(id))}>Learn more</NavLink>
                    </button>
                </div>


            </div>
        </div>
    );
};

export {MovieInfo};
