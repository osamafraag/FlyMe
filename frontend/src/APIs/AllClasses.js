import { axiosInstance } from "./Config";

export const AllClasses = () => {
  
  return axiosInstance.get('flights/api/classes/')
}