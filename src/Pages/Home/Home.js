import React from 'react';

import {NowPlaying, Popular, TopRated, Upcoming} from "../../Components";
import {CarouselPreview} from "../../Components/CarouselPreview/CarouselPreview";
import './Home.style.css';


const Home = () => {

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
