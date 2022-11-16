import React from 'react';
import {useSelector} from "react-redux";
import {MovieBadge} from "../../Components";
import './Favourites.style.css';
import trailerNotAvailableImage from "../../img/Group 76.png";

const Favourites = () => {

    let {favourites} = useSelector(state => state['movieListReducer']);

    return (
        <div className={"favouritesWrap"}>
            <h1 className={"favouritesTitle"}>Favourites</h1>
            {favourites.length === 0 ?
                <div className={"favouritesMoviesIsEmptyMessage"}>
                    <img src={trailerNotAvailableImage} alt=""/>
                    <h2>Your favourite movies are empty. Add it and come back...</h2>
                </div>
                :
                <div className={"favouritesMoviesWrap"}>
                    {favourites.map(value => <MovieBadge key={value.id} movie={value}/>)}
                </div>
            }


        </div>
    );
};

export {Favourites};
