import { axiosInstance } from "./Config";


export default function TrendingPlace(headers) {
    return axiosInstance.get('countries/api/trendingPlaces/', {
        headers: headers
    })
}

