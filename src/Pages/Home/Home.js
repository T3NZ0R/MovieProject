import React from 'react';

import {PosterPreview, NowPlaying, Popular, TopRated, Upcoming} from "../../Components";

const Home = () => {

    return (
        <div>
            <PosterPreview/>
            <NowPlaying/>
            <Upcoming/>
            <TopRated/>
            <Popular/>
        </div>
    );
};

export {Home};
