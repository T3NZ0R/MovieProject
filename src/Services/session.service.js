import {axiosService} from "./axios.service";
import {key, urls} from "../Constants";

export const sessionService = {
    getSessionId: () => axiosService.get(urls.sessionId + key).then(value => value.data),
    rateMovieById: (id, value) => axiosService.post(urls.movieId + id + '/rating' + key, value).then(value => value.data),
    removeRating: (id, sessionId) => axiosService.delete(urls.movieId+ id +'/rating' + key + `&guest_session_id=${sessionId}`)
};
