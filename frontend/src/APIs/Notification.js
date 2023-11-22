import { axiosInstance } from "./Config";

export const GetMessages = (userId, headers) => {
  
  return axiosInstance.get(`/accounts/api/user/${userId}/notifications`, {
    headers: headers
  })
}

export const GetSpecificMessage = (notificationId,headers) => {
  return axiosInstance.get(`accounts/api/notifications/${notificationId}`, {
    headers: headers,
  });
};

export const PutMessage = (notificationId, data, headers) => {
  return axiosInstance.put(`accounts/api/notifications/${notificationId}`, data, {
    headers: headers,
  });
};

export const DeleteMessage = (notificationId, headers) => {
  return axiosInstance.delete(`accounts/api/notifications/${notificationId}`, {
    headers: headers,
  });
};

export const GetSendMessages = (userId, headers) => {
  return axiosInstance.get(`accounts/api/user/${userId}/complaints`, {
    headers: headers,
  });
};