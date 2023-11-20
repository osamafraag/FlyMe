import { axiosInstance } from "./Config";

export const UserFlightHistory = (userID) => {
  
  return axiosInstance.get(`flights/api/user/${userID}/history/`)
}