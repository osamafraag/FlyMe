import { axiosInstance } from "./Config";

export const Cities = (headers) => {
  
  return axiosInstance.get('countries/api/cities/')
}