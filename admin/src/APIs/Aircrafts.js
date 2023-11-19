import { axiosInstance } from "./Config";

export const AircraftsAPI = (headers) => {
  return axiosInstance.get('flights/api/aircrafts/',{headers: headers})
}