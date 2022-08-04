import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {moviesListService} from '../Services'
import {urls} from "../Constants";

export const getPosterPreview = createAsyncThunk(
    'movieListSlice/getPosterPreview',
    async () => {
        try {
            let poster = await moviesListService.getMovieList(urls.upcoming);
            poster = poster['results'][0];
            return poster;
        } catch (e) {
            console.log(e.message);
        }
    }
);

export const getMovieList = createAsyncThunk(
    'movieListSlice/getMovieList',
    async (type) => {
        try {
            let moviesList = await moviesListService.getMovieList(type);
            moviesList = moviesList['results'];
            return {moviesList, type};
        } catch (e) {
            console.log(e.message);
        }
    }
);

export const searchMovie = createAsyncThunk(
    'movieListSlice/searchMovie',
    async (name) => {
        try {
            let searchMovie = await moviesListService.getMovieByName(name);
            searchMovie = searchMovie['results'];
            return searchMovie;
        } catch (e) {
            console.log(e.message);
        }
    }
);

export const getMovieById  = createAsyncThunk(
    'movieListSlice/getMovieById',
    async (id) => {
        try {
            return await moviesListService.getMovieById(id);
        } catch (e) {
            console.log(e.message);
        }
    }
);



const movieListSlice = createSlice({
    name: "movieListSlice",

    initialState: {
        movies: [],
        nowPlaying: [],
        popular: [],
        upcoming: [],
        topRated: [],
        searchMovies: [],
        poster: {},
        movie: {},
        currentType:null,
        movieId: null,
        genreId: null,
        moviesType: null,
        status: null,
        error: null,
        page: 1
    },

    reducers: {
        addGenreId: (state, action) => {
            state.genreId = action.payload;
            state.page = 1;
        },
        addTypeOfMovies: (state, action) => {
            state.moviesType = action.payload;
            switch (action.payload){
                case urls.upcoming:
                    state.currentType = 'Upcoming';
                    break;
                case urls.nowPlaying:
                    state.currentType = 'Now Playing';
                    break;
                case urls.popular:
                    state.currentType = 'Popular';
                    break;
                case urls.topRated:
                    state.currentType = 'Top rated'
                    break;
                default:
            }
            state.page = 1;
        },
        addMovieId: (state, action) => {
            state.movieId = action.payload;
        },
        addPageNumber: (state, action) => {
            switch (action.payload) {
                case 'next':
                    state.page = state.page + 1;
                    break;
                case 'twoStep':
                    state.page = 3;
                    break;
                case 'prev':
                    state.page = state.page - 1;
                    break;
                default:
            }
            if (state.page === 0) {
                state.page = 1;
            }
        }

    },

    extraReducers: {
        [getPosterPreview.pending]: (state) => {
            state.status = 'Loading...';
            state.error = null;
        },
        [getPosterPreview.fulfilled]: (state, action) => {
            state.status = 'Loading finished!';
            state.poster = action.payload;
        },
        [getPosterPreview.rejected]: (state) => {
            state.status = 'rejected';
            state.error = 'error';
        },
        [getMovieList.pending]: (state) => {
            state.status = 'Loading...';
            state.error = null;
        },
        [getMovieList.fulfilled]: (state, action) => {
            state.status = 'Loading finished!';
            switch (action.payload.type){
                case urls.upcoming:
                    state.upcoming = action.payload.moviesList
                    break;
                case urls.nowPlaying:
                    state.nowPlaying = action.payload.moviesList
                    break;
                case urls.popular:
                    state.popular = action.payload.moviesList
                    break;
                case urls.topRated:
                    state.topRated = action.payload.moviesList
                    break;
                default:
            }
        },
        [getMovieList.rejected]: (state) => {
            state.status = 'rejected';
            state.error = 'error';
        },
        [searchMovie.pending]: (state) => {
            state.status = 'Loading...';
            state.error = null;
        },
        [searchMovie.fulfilled]: (state, action) => {
            state.status = 'Loading finished!';
            state.searchMovies = action.payload;
        },
        [searchMovie.rejected]: (state) => {
            state.status = 'rejected';
            state.error = 'error';
        },
        [getMovieById.pending]: (state) => {
            state.status = 'Loading...';
            state.error = null;
        },
        [getMovieById.fulfilled]: (state, action) => {
            state.status = 'Loading finished!';
            state.movie = action.payload;
        },
        [getMovieById.rejected]: (state) => {
            state.status = 'rejected';
            state.error = 'error';
        }
    }

});

const movieListReducer = movieListSlice.reducer;
export const {addGenreId, addTypeOfMovies, addMovieId, addPageNumber} = movieListSlice.actions;
export {movieListReducer};
