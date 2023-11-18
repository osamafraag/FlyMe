import { axiosInstance } from "./Config";

export const FlightOffers = () => {
  
  return axiosInstance.get('flights/api/offer')
}