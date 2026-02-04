import { IAdminAd } from "../../../utils/types/dto/IAdAdminDto";

export interface GetAdsAdminDTO {
    skip: number;
    limit: number;
}

export interface GetAdsAdminResponseDTO {
    count: number;
    ads: IAdminAd[];
}
