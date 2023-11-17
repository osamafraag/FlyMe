import { axiosInstance } from "./Config";


export default function TrendingPlace() {
    return axiosInstance.get('countries/api/trendingPlaces/')
}

