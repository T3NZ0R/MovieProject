import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {Rating} from "react-simple-star-rating";

import {
    addMovieToFavourites,
    deleteMovieFromFavourites,
    getMovieById,
    getMovieVideoById, getReviewMovieById,
    getSimilarMoviesById,
    rateMovieById,
    removeRating,
    switcherController
} from "../../Store";
import {baseURLImg} from "../../Constants";
import {SimilarMovies, Reviews} from "../../Components";

import './watchMovie.style.css';
import trailerNotAvailableImage from '../../img/Group 76.png';
import likeFavourites from '../../img/Favourites.png';
import likeFavouritesActive from '../../img/FavouritesActive.png';

const WatchMovie = () => {

    let {id} = useParams();


    const {movie, movieTrailer, favourites} = useSelector(state => state['movieListReducer']);
    const {sessionId, switcher} = useSelector(state => state['rateReducer']);

    const dispatch = useDispatch();

    let deleteRateButton = document.getElementById('deleteRate');
    let rateButton = document.getElementById('rate');

    let likeFavouritesButton = document.getElementById('likeFavourites');
    let likeFavouritesActiveButton = document.getElementById('likeFavouritesActive');

    if (likeFavouritesButton !== null){
        likeFavouritesButton.classList.remove('favouritesButtonHide');
        likeFavouritesActiveButton.classList.add('favouritesButtonHide');
    }

    if (favourites.length > 0) {

        for (let i = 0; i < favourites.length; i++) {
            console.log(favourites[i].id);
            if (Number(favourites[i].id) === Number(id)) {
                console.log(favourites[i].id, id);
                if (likeFavouritesButton !== null){
                    likeFavouritesButton.classList.add('favouritesButtonHide');
                    likeFavouritesActiveButton.classList.remove('favouritesButtonHide');
                }
                break;
            }
        }
    }

    useEffect(() => {
        dispatch(getMovieById(id));
        dispatch(getMovieVideoById(id));
        dispatch(getSimilarMoviesById(id));
        dispatch(getReviewMovieById(id));
    }, [id, dispatch]);

    let movieImg = baseURLImg + movie['poster_path'];

    let TrailerLink;

    if (typeof movieTrailer !== "undefined") {
        for (let i = 0; i < movieTrailer.length; i++) {
            if (movieTrailer[i].type === "Trailer") {
                TrailerLink = 'https://www.youtube.com/embed/' + movieTrailer[i].key;
                break;
            }
        }
    }

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
    }

    const addToFavourites = (data) => {
        dispatch(addMovieToFavourites(data));
    }

    const deleteFromFavourites = (data) => {
        dispatch(deleteMovieFromFavourites(data));
    }

    return (
        <div className={"watchMovieWrap"}>

            <div className={"movieWrap"}>
                <div className={"movieImageWrap"}>
                    <img className={'movieImage'} src={movieImg} alt="movieImg"/>
                    <button className={"favouritesButton"}
                            id={'likeFavourites'}
                            onClick={() => {
                                likeFavouritesButton.classList.add('favouritesButtonHide');
                                likeFavouritesActiveButton.classList.remove('favouritesButtonHide');
                                addToFavourites(movie);
                            }}
                    ><span><img src={likeFavourites} alt=""/></span> Add to favourites
                    </button>

                    <button className={"favouritesButtonActive favouritesButtonHide"}
                            id={'likeFavouritesActive'}
                            onClick={() => {
                                likeFavouritesButton.classList.remove('favouritesButtonHide');
                                likeFavouritesActiveButton.classList.add('favouritesButtonHide');
                                deleteFromFavourites(movie.id);
                            }}
                    ><span><img src={likeFavouritesActive} alt=""/></span> Add to favourites
                    </button>

                </div>
                <div className={'movieInfoWrap'}>

                    <div className={'colorText movieTitle'}>
                        {movie.title}
                    </div>

                    <div className={'textInfoWrap'}>
                        <div className={'green'}>
                            <div className={'infoBlock'}>Tagline:</div>
                            <span className={'lightGreen'}>{movie['tagline'] !== '' ?  movie['tagline'] : 'No info'}</span>
                        </div>

                        <div className={'green'}>
                            <div className={'infoBlock'}>Budget:</div>
                            <span className={'lightGreen'}>{movie['budget'] !== 0 ? movie['budget'] + ' $' : 'No info'} </span>
                        </div>

                        <div className={'green'}>
                            <div className={'infoBlock'}>Revenue:</div>
                            <span className={'lightGreen'}>{movie['revenue'] !== 0 ? movie['revenue'] + ' $' : 'No info'}</span>
                        </div>

                        <div className={'green'}>
                            <div className={'infoBlock'}>Runtime:</div>
                            <span className={'lightGreen'}>{movie['runtime'] !== 0 ? movie['runtime'] + ' min' : 'No info'}</span>
                        </div>

                        <div className={'green'}>
                            <div className={'infoBlock'}>Release date:</div>
                            <span className={'lightGreen'}>{movie['release_date'] ? movie['release_date'].replaceAll('-','/')  : 'No info' }</span>
                        </div>

                        <div className={'green'}>
                            <div className={'infoBlock'}>Country:</div>
                            <span
                                className={'lightGreen'}>{typeof movie['production_countries'][0] !== "undefined" ? getInfo(movie['production_countries']) : 'No info'}</span>
                        </div>

                        <div className={'green'}>
                            <div className={'infoBlock'}>Genres:</div>
                            <span className={'lightGreen'}>{typeof movie['genres'][0] !== "undefined" ? getInfo(movie['genres']) : 'No info'}</span>
                        </div>

                        <div className={'green'}>
                            <div className={'infoBlock'}>Spoken languages:</div>
                            <span
                                className={'lightGreen'}>{typeof movie['spoken_languages'][0] !== "undefined" ? getInfo(movie['spoken_languages']) : 'No info'}</span>
                        </div>

                        <div className={'green'}>
                            <div className={'infoBlock'}>Production companies:</div>
                            <span
                                className={'lightGreen'}>{typeof movie['production_companies'][0] !== "undefined" ? getInfo(movie['production_companies']) : 'No info'}</span>
                        </div>

                        <div className={'green'}>
                            <div className={'infoBlock'}>Vote count:</div>
                            <span className={'lightGreen'}>{movie['vote_count'] !== 0 ? movie['vote_count'] : 'No info'}</span>
                        </div>

                        <div className={'green'}>
                            <div className={'infoBlock'}>IMDB:</div>
                            <span
                                className={'lightGreen'}>({movie['vote_average'] ? movie['vote_average'].toFixed(1) : 'No info'})</span>
                        </div>
                        <h4 className={'green mb-3 rateMessage'}>Rate this movie:</h4>
                    </div>

                    <div className={"rateWrap"}>

                        <Rating className={"ratingStars"}
                                ratingValue={0}
                                iconsCount={10}
                                fillColor={"#219897"}
                                emptyColor={"#85CFCB"}
                                readonly={switcher} onClick={handleRating}/>

                        <button className={'rateButton'} id={'rate'} onClick={() => {
                            rateButton.classList.add('hide');
                            deleteRateButton.classList.remove('hide');
                        }}>Leave my rate
                        </button>

                        <button className={'hide rateButton red'} id={'deleteRate'} onClick={() => {
                            dispatch(removeRating(id, sessionId));
                            deleteRateButton.classList.add('hide');
                            rateButton.classList.remove('hide');
                            dispatch(switcherController(!switcher));
                        }}>Delete my rate
                        </button>
                    </div>


                </div>
            </div>

            <div className={'overviewBlock'}>
                <h2 className={"description"}>Description</h2>
                {movie['overview'] !== ''? movie['overview'] : 'We can\'t provide a short description for this movie yet.'}
            </div>

            {typeof movieTrailer !== "undefined" ?
                <div className={'movieTrailer'}>
                    <iframe title={movie.title} src={TrailerLink}></iframe>
                </div>
                :
                <div className={'trailerNotAvailableBlockWrap'}>
                    <div className={'trailerNotAvailableBlock'}>
                        <div className={'messageBlock'}>
                            <img src={trailerNotAvailableImage} alt=""/>
                            <p>Oops... Trailer is not available(</p>
                        </div>
                    </div>
                </div>
            }

            <SimilarMovies/>
            <Reviews movieId={id}/>

        </div>


    );
};

export {WatchMovie};





