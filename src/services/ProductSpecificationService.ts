import axios from 'axios';
const API_URL = "http://localhost:8080/api/v1/admin/productSpecification";
import type { productSpecificationsApiResponse } from '../models/productSpecification';
const axiosInstance = axios.create();

export const ProductSpecificationService = {
    getAllProductAttribute: async (page: number = 0, size: number = 2): Promise<productSpecificationsApiResponse> => {
        const response = await axiosInstance.get<productSpecificationsApiResponse>(`${API_URL}?page=${page}&size=${size}`);
        return response.data;
    }
}

















