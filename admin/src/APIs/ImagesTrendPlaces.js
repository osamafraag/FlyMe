import { axiosInstance } from "./Config";


export default function ImagesTrendPlaces() {
    return axiosInstance.get('countries/api/trendingPlaces/images/')
}

