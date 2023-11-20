import { axiosInstance } from "./Config";


export default function ImagesTrendPlaces(headers) {
    return axiosInstance.get('countries/api/trendingPlaces/images/', {
        headers: headers
    })
}

