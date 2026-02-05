import { ServiceResponseDTO } from "./ServiceResponseDTO";

export interface GetServiceListRequestDTO {
  skip: number;
  limit: number;
  search: string;
}

export interface GetServiceListResponseDTO {
  allServices: ServiceResponseDTO[];
  count: number;
}
