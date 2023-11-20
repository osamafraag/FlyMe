import { axiosInstance } from "./Config";


export default function ImagesCountry(headers) {
    return axiosInstance.get('countries/api/images/', {
        headers: headers
    })
}

