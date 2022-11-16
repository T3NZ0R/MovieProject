import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {moviesListService} from '../Services'
import {urls} from "../Constants";

export const getPosterPreview = createAsyncThunk(
    'movieListSlice/getPosterPreview',
    async () => {
        try {
            let poster = await moviesListService.getMovieList(urls.nowPlaying);
            poster = poster['results'].slice(0, 5);
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

export const getMovieById = createAsyncThunk(
    'movieListSlice/getMovieById',
    async (id) => {
        try {
            return await moviesListService.getMovieById(id);
        } catch (e) {
            console.log(e.message);
        }
    }
);

export const getMovieVideoById = createAsyncThunk(
    'movieListSlice/getMovieVideoById',
    async (id) => {
        try {
            let movieTrailer = await moviesListService.getMovieVideoById(id);
            movieTrailer = movieTrailer.results;
            if (movieTrailer.length !== 0) {
                return movieTrailer;
            } else {
                return undefined;
            }

        } catch (e) {
            console.log(e.message);
        }
    }
);

export const getSimilarMoviesById = createAsyncThunk(
    'movieListSlice/getSimilarMoviesById',
    async (id) => {
        try {
            let similarMoviesById = await moviesListService.getSimilarMoviesById(id);
            similarMoviesById = similarMoviesById.results;
            return similarMoviesById;
        } catch (e) {
            console.log(e.message);
        }
    }
);

export const getReviewMovieById = createAsyncThunk(
    'movieListSlice/getReviewMovieById',
    async (id) => {
        try {
            let reviewMovie = await moviesListService.getReviewMovieById(id);
            reviewMovie = reviewMovie.results;
            return reviewMovie;
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
        movieTrailer: [],
        similarMovies: [],
        reviewFromAPI: [],
        reviewFromFront: [],
        favourites: [],
        poster: [],
        movie: {},
        sort: '&',
        currentType: null,
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
            switch (action.payload) {
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
        addSort: (state, action) => {
            state.sort = action.payload;
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
        },
        addReview: (state, action) => {

            state.reviewFromFront.push({
                content: action.payload.content,
                movieId: action.payload.movieId,
                author_details: {
                    username: action.payload.username,
                    email: action.payload.email,
                    avatar_path: null
                }
            });
        },
        addMovieToFavourites: (state, action) => {

            if (state.favourites.length === 0) {
                state.favourites.push(action.payload);
            } else if (state.favourites.length !== 0) {
                for (let i = 0; i < state.favourites.length; i++) {
                    if (Number(action.payload.id) === Number(state.favourites[i].id)) {
                        break;
                    } else if (action.payload !== state.favourites[i] && i === state.favourites.length - 1) {
                        state.favourites.push(action.payload);
                    }
                }
            }


        },
        deleteMovieFromFavourites: (state, action) => {
            for (let i = 0; i < state.favourites.length; i++) {
                if (state.favourites[i].id === action.payload) {
                    state.favourites.splice(i, 1);
                }
            }
        },

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
            switch (action.payload.type) {
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
        },
        [getMovieVideoById.pending]: (state) => {
            state.status = 'Loading...';
            state.error = null;
        },
        [getMovieVideoById.fulfilled]: (state, action) => {
            state.status = 'Loading finished!';
            state.movieTrailer = action.payload;
        },
        [getMovieVideoById.rejected]: (state) => {
            state.status = 'rejected';
            state.error = 'error';
        },
        [getSimilarMoviesById.pending]: (state) => {
            state.status = 'Loading...';
            state.error = null;
        },
        [getSimilarMoviesById.fulfilled]: (state, action) => {
            state.status = 'Loading finished!';
            state.similarMovies = action.payload;
        },
        [getSimilarMoviesById.rejected]: (state) => {
            state.status = 'rejected';
            state.error = 'error';
        },
        [getReviewMovieById.pending]: (state) => {
            state.status = 'Loading...';
            state.error = null;
        },
        [getReviewMovieById.fulfilled]: (state, action) => {
            state.status = 'Loading finished!';
            state.reviewFromAPI = action.payload;
        },
        [getReviewMovieById.rejected]: (state) => {
            state.status = 'rejected';
            state.error = 'error';
        }
    }

});

const movieListReducer = movieListSlice.reducer;
export const {
    addGenreId,
    addTypeOfMovies,
    addMovieId,
    addPageNumber,
    addReview,
    addMovieToFavourites,
    deleteMovieFromFavourites,
    addSort
} = movieListSlice.actions;
export {movieListReducer};
