import { axiosInstance } from "./Config";

export const Trending = (id) => {
  
  return axiosInstance.get(`countries/api/cities/${id}/trendingPlaces/`)
}