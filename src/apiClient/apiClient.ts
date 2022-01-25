import axios from "axios";

const BASE_URL = 'http://api.programator.sk'
export const apiClient = axios.create({
    baseURL: BASE_URL,
})

export const apiPics = axios.create({
    baseURL: BASE_URL,
    responseType: 'blob'
})

