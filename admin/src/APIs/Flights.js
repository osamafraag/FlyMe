import { axiosInstance } from "./Config";

export const FlightsAPI = (headers) => {
  return axiosInstance.get('flights/api/all/', {
    headers: headers
})
}