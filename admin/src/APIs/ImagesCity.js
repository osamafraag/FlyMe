import { axiosInstance } from "./Config";


export default function ImagesCity() {
    return axiosInstance.get('countries/api/city/images/')
}

