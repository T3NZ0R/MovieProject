import {configureStore} from "@reduxjs/toolkit";
import {genreReducer} from "./genre.slice";
import {movieListReducer} from "./moviesList.slice";
import {rateReducer} from "./rate.slice";

const store = configureStore({
    reducer: {
        genreReducer,
        movieListReducer,
        rateReducer
    }
});

export {store};
