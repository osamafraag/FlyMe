import { axiosInstance } from "./Config";


export default function ImagesCountry() {
    return axiosInstance.get('countries/api/images/')
}

