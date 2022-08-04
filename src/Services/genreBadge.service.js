import {axiosService} from "./axios.service";
import {key, urls} from "../Constants";

export const genreBadgeService = {
    getAll:()=>axiosService.get(urls.genre + key).then(value => value.data)
};
