import { axiosInstance } from "./Config";


export const AirportsAPI = (headers) =>  {
    return axiosInstance.get('countries/api/airports/', {
        headers: headers
    })
}