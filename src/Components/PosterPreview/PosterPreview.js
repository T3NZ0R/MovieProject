import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {Rating} from 'react-simple-star-rating'

import {baseURL_img} from "../../Constants";
import {addMovieId, getPosterPreview} from "../../Store";
import './posterPreview.style.css';

const PosterPreview = () => {
    const {poster} = useSelector(state => state['movieListReducer']);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosterPreview());
    }, [dispatch]);

    let posterImg = baseURL_img + poster['poster_path'];
    let language = poster['original_language'];

    return (
        <div className={"posterWrap"}>
            <div className={"poster"}>
                <img className={"posterImg"} src={posterImg} alt={poster['title']}/>
                <div className={'posterInfo'}>
                    <h1 className={'colorText posterTitle'}>{poster['title']}</h1>
                    <p className={'posterDate'}>Date release: <span
                        className={'colorText date'}>{poster['release_date']}</span></p>
                    <p className={'posterLanguage'}>Language: <span
                        className={'colorText language'}>{language ? language.toUpperCase() : language}</span></p>
                    <p className={'posterOverview'}>{poster['overview']}</p>
                    <div className={"rating"}>Rating :</div>
                    <Rating className={"stars"} ratingValue={poster['vote_average'] * 10} iconsCount={10}
                            readonly={true} fillColor={"#00C2FF"}/>
                    <button className={'posterButton'}><NavLink className={"buttonLink"} to={`/movie/${poster.id}`}
                                                                onClick={() => dispatch(addMovieId(poster.id))}>Watch
                        now</NavLink></button>
                </div>
            </div>
        </div>

    );
};

export {PosterPreview};
