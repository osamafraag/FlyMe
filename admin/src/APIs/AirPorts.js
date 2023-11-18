import { axiosInstance } from "./Config";


export const AirportsAPI = () =>  {
    return axiosInstance.get('countries/api/airports/')
}