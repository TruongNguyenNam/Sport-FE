import type { ApiResponse } from "./apiResponse";

export interface ProductSpecificationOption {
    specificationId: number;
    productId: number;
    value: string;
}

export interface ProductRequest {
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    sportType: string;
    material: string;
    size: string;
    color: string;
    sku: string; //UUID
    supplierId: number;
    categoryId: number;
    sportTypeId: number[];
    tagId: number[];
    productSpecificationOptions: ProductSpecificationOption[];
    productImageIds: number[];
    inventoryIds: number[];
}

export interface ProductSpecificationOptionResponse {
    id: number;
    specificationName: string;
    productId: number;
    value: string;
}

export interface InventoryResponse {
    id: number;
    productName: string;
    stockQuantity: string;
}

export interface ProductResponse {
    id: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    sportType: string;
    material: string;
    size: string;
    color: string;
    sku: string;
    supplierName: string;
    categoryName: string;
    sportTypeName: string[];
    productSpecificationOptionResponses: ProductSpecificationOptionResponse[];
    tagName: string[];
    ImageUrl: string[];
    inventories: InventoryResponse[];
}

export interface ProductSearchRequest {
    name: string;
    minPrice: number;
    maxPrice: number;
    sportType: string;
    material: string;
    size: string;
    color: string;
    supplierName: string;
    categoryName: string;
}

export interface ProductApiResponse extends ApiResponse<ProductResponse> {}
