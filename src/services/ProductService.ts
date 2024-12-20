import type { ProductRequest, ProductResponse, ProductSearchRequest } from "../models/product";
import axios from 'axios';
const API_URL = "http://localhost:8080/api/v1/admin/product";
const axiosInstance = axios.create();

export const ProductService = {
    getAllProducts: async (page: number = 0, size: number = 2): Promise<ProductResponse[]> => {
        const response = await axiosInstance.get<ProductResponse[]>(`${API_URL}?page=${page}&size=${size}`);
        return response.data;
    },

    searchProductsByAttribute: async (searchRequest: ProductSearchRequest, page: number = 0, size: number = 2): Promise<ProductResponse[]> => {
        const response = await axiosInstance.get<ProductResponse[]>(`${API_URL}/search`, {
            params: { ...searchRequest, page, size }
        });
        return response.data;
    },

    addProduct: async (productRequest: ProductRequest): Promise<ProductResponse> => {
        const response = await axiosInstance.post<ProductResponse>(API_URL, productRequest);
        return response.data;
    },

    updateProduct: async (id: number, productRequest: ProductRequest): Promise<ProductResponse> => {
        const response = await axiosInstance.put<ProductResponse>(`${API_URL}/${id}`, productRequest);
        return response.data;
    },

    deleteProducts: async (ids: number[]): Promise<void> => {
        await axiosInstance.delete(API_URL, { data: ids });
    }
};



















