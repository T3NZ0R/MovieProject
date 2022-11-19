import React, {useEffect} from 'react';

import {NowPlaying, Popular, TopRated, Upcoming} from "../../Components";
import {CarouselPreview} from "../../Components/CarouselPreview/CarouselPreview";
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
