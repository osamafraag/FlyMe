import { axiosInstance } from "./Config";

export const GetClasses = (headers) => {
  return axiosInstance.get('flights/api/classes/', {
    headers: headers
})
}

export const PostClasses = (data, headers) => {
  return axiosInstance.post('flights/api/classes/', data, {
    headers: headers
})
}

export const GetSpecificClass = (id, headers) => {
  return axiosInstance.get(`flights/api/classes/${id}`, {
    headers: headers
})
}

export const EditClass = (id, data, headers) => {
  return axiosInstance.put(`flights/api/classes/${id}`, data, {
    headers: headers
})
};

export const DeleteClass = (id, headers) => {
  return axiosInstance.delete(`flights/api/classes/${id}`, {
    headers: headers
})
};