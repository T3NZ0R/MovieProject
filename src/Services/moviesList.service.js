import {axiosService} from "./axios.service";
import {key, urls} from "../Constants";

export const moviesListService = {
    getByGenre: (id, page, sort) => axiosService.get(urls.discover + key + sort + '&language=en-U&with_genres=' + id + '&page=' + page).then(value => value.data),
    getMovieList: (type, page) => axiosService.get(type + key + '&language=en-US&page=' + page).then(value => value.data),
    getMovieByName: (name) => axiosService.get(urls.search + key + '&query=' + name).then(value => value.data),
    getMovieById: (id) => axiosService.get(urls.movieId + id + key).then(value => value.data),
    getMovieVideoById: (id) => axiosService.get(urls.movieId + id + urls.movieTrailer + key).then(value => value.data),
    getSimilarMoviesById: (id) => axiosService.get(urls.movieId + id + urls.similarMovies + key).then(value => value.data),
    getReviewMovieById: (id) => axiosService.get(urls.movieId + id + urls.movieReview + key).then(value => value.data),
};
