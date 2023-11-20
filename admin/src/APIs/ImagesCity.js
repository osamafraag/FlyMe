import { axiosInstance } from "./Config";


export default function ImagesCity(headers) {
    return axiosInstance.get('countries/api/city/images/', {
        headers: headers
    })
}

