import { ICategory } from "../../../../domain/entities/ICategory ";

export interface AddCategoryDTO {
    category: {
        category: string;
        isListed: boolean;
        subCategory?: any[];
        isBlocked: boolean;
    };
}

export interface EditCategoryDTO {
    categoryId: string;
    newName: string;
}

export type CategoryResponseDTO = ICategory | string | void;

export interface AddServiceDTO {
    categoryId: string;
    service: {
        serviceName: string;
        serviceDescription: string;
        isHidden?: boolean;
    };
}

export interface BlockUnblockCategoryDTO {
    categoryId: string;
}

export interface BlockUnblockCategoryServiceDTO {
    categoryId: string;
    serviceId: string;
}

export interface DeleteCategoryDTO {
    categoryId: string;
}

export interface DeleteServiceDTO {
    categoryId: string;
    serviceId: string;
}
