export interface GetProvidersDTO {
    skip: number;
    limit: number;
    search: string;
    serviceProviderVerfication?: boolean;
}
