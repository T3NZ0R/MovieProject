import axios from "axios";
import {baseURL} from "../Constants";

const axiosService = axios.create({baseURL});

export {axiosService};
