import { axiosInstance } from "./Config";

export const Cities = () => {
  return axiosInstance.get('countries/api/cities/')
}