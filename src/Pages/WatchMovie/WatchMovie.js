import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {Rating} from "react-simple-star-rating";

import {getMovieById, rateMovieById, removeRating, switcherController} from "../../Store";
import {baseURL_img} from "../../Constants";
import './watchMovie.style.css';

const WatchMovie = () => {

    let {id} = useParams();

    const {movie} = useSelector(state => state['movieListReducer']);
    const {sessionId, switcher} = useSelector(state => state['rateReducer']);

    const dispatch = useDispatch();
    let deleteButton = document.getElementById('rate');

    useEffect(() => {
        dispatch(getMovieById(id));
    }, [dispatch, id]);

    let movieImg = baseURL_img + movie['poster_path'];

    let getInfo = (data) => {
        let info = '';

        for (let i = 0; i < data.length; i++) {
            if (i === 0) {
                info = info + data[i].name;
            } else {
                info = info + `, ${data[i].name}`;
            }
        }
        return info;
    }

    const handleRating = (rate) => {
        dispatch(switcherController(!switcher));
        dispatch(rateMovieById(id, rate, sessionId));
        deleteButton.classList.remove('hide');
    }

    return (
        <div >

            <div className={"movieWrap"}>
                <div>
                    <img className={'movieImage'} src={movieImg} alt="movieImg"/>
                </div>
                <div className={'movieInfoWrap'}>

                    <div className={'colorText movieTitle'}>
                        {movie.title}
                    </div>

                    <div className={'textInfoWrap'}>
                        <div className={'white'}>
                            <div className={'infoBlock'}>Tagline:</div>
                            <span className={'blue'}>{movie['tagline']}</span>
                        </div>

                        <div className={'white'}>
                            <div className={'infoBlock'}>Budget:</div>
                            <span className={'blue'}>{movie['budget']} $</span>
                        </div>

                        <div className={'white'}>
                            <div className={'infoBlock'}>Revenue:</div>
                            <span className={'blue'}>{movie['revenue']} $</span>
                        </div>

                        <div className={'white'}>
                            <div className={'infoBlock'}>Runtime:</div>
                            <span className={'blue'}>{movie['runtime']}min</span>
                        </div>

                        <div className={'white'}>
                            <div className={'infoBlock'}>Release date:</div>
                            <span className={'blue'}>{movie['release_date']}</span>
                        </div>

                        <div className={'white'}>
                            <div className={'infoBlock'}>Country:</div>
                            <span className={'blue'}>{movie['production_countries'] ? getInfo(movie['production_countries']) : 'error'}</span>
                        </div>

                        <div className={'white'}>
                            <div className={'infoBlock'}>Genres:</div>
                            <span className={'blue'}>{movie['genres'] ? getInfo(movie['genres']) : 'error'}</span>
                        </div>

                        <div className={'white'}>
                            <div className={'infoBlock'}>Spoken languages:</div>
                            <span className={'blue'}>{movie['spoken_languages'] ? getInfo(movie['spoken_languages']) : 'error'}</span>
                        </div>

                        <div className={'white'}>
                            <div className={'infoBlock'}>Production companies: </div>
                            <span className={'blue'}>{movie['production_companies'] ? getInfo(movie['production_companies']) : 'error'}</span>
                        </div>

                        <div className={'white'}>
                            <div className={'infoBlock'}>Vote count: </div>
                            <span className={'blue'}>{movie['vote_count']}</span>
                        </div>
                    </div>

                    <div className={"rateWrap"}>

                        <h4 className={'white mb-3'}>Rating:</h4>
                        <Rating ratingValue={movie['vote_average'] * 10} iconsCount={10} fillColor={"#00C2FF"}
                                readonly={switcher} onClick={handleRating}/>
                        <button className={'hide rateButton'} id={'rate'} onClick={() => {
                            dispatch(removeRating(id, sessionId));
                            deleteButton.classList.add('hide');
                            dispatch(switcherController(!switcher));
                        }}>delete
                        </button>
                    </div>


                </div>
            </div>

            <div className={'overviewBlock'}>
                {movie['overview']}
            </div>


        </div>
    );
};

export {WatchMovie};
