import { axiosInstance } from "./Config";

export const GetClasses = () => {
  return axiosInstance.get('flights/api/classes/')
}

export const PostClasses = (data) => {
  return axiosInstance.post('flights/api/classes/', data)
}

export const GetSpecificClass = (id) => {
  return axiosInstance.get(`flights/api/classes/${id}`)
}

export const EditClass = (id, data) => {
  return axiosInstance.put(`flights/api/classes/${id}/`, data);
};

export const DeleteClass = (id) => {
  return axiosInstance.delete(`flights/api/classes/${id}/`);
};