export interface ICategoryServiceType {
    id?: string;
    serviceName: string;
    serviceDescription: string;
    isHidden?: boolean;
}

export interface ICategoryDTO {
    id?: string;
    category?: string;
    isHidden?: boolean;
    typeService?: ICategoryServiceType[];
    createdAt?: Date;
    updatedAt?: Date;
}
