import type { ApiResponse } from "./apiResponse";
export interface productSpecificationRequest {
    name: string;
    description: string;
}

export interface productSpecificationResponse{
    id: number;
    name: string;
    description: string;
}


export interface productSpecificationsApiResponse extends ApiResponse<productSpecificationResponse> {}






