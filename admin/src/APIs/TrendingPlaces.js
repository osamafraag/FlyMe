import { axiosInstance } from "./Config";


export default function AirPorts() {
    return axiosInstance.get('countries/api/trendingPlaces/')
}

