import React, {useEffect} from 'react';

import {NowPlaying, Popular, TopRated, Upcoming, CarouselPreview} from "../../Components";

import './Home.style.css';


const Home = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className={'homeWrap'}>
            <CarouselPreview/>
            <Upcoming/>
            <Popular/>
            <TopRated/>
            <NowPlaying/>
        </div>
    );
};

export {Home};
