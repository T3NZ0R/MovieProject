import Carousel from 'react-bootstrap/Carousel';
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {addMovieId, getPosterPreview} from "../../Store";
import {baseURLBackdrop} from "../../Constants";
import './CarouselPreview.style.css';
import starCarousel from '../../img/starCarousel.png'
import calendarCarousel from '../../img/calendarCarousel.png'
import {NavLink} from "react-router-dom";


const CarouselPreview = () => {

    const {poster} = useSelector(state => state['movieListReducer']);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosterPreview());
    }, [dispatch]);

    return (
        <Carousel>
            {poster.map(item =>
                <Carousel.Item interval={4000} key={item.id}>

                    <img className={"posterImg"} src={baseURLBackdrop + item['backdrop_path']} alt=""/>
                    <div className={"posterTextWrap"}>
                        <div className="contentCarousel">

                            <div className="textButton">
                                <div className="allContent">
                                    <div className="contentWrap">
                                        <h1 className="movieName">{item.title}</h1>

                                        <div className="ratingData">
                                            <div className="rating">
                                                <img className="star" src={starCarousel} alt=""/>
                                                <p className="ratingText">({item['vote_average'] ? item['vote_average'].toFixed(1) : item['vote_average']})</p>
                                            </div>

                                            <div className="data">
                                                <img className="calendar" src={calendarCarousel} alt=""/>
                                                <p className="dataText">{item['release_date'].substring(0, 4)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="movieInfo">{item['overview']}</p>


                                </div>

                                <button className="buttonPoster"><NavLink
                                    className={"posterLink"}
                                    to={`/movie/${item.id}`}
                                    onClick={() => dispatch(addMovieId(item.id))}>Learn
                                    more</NavLink></button>

                            </div>


                        </div>
                    </div>

                </Carousel.Item>
            )}
        </Carousel>
    );
}

export {CarouselPreview};
