import { IAuthResponse } from "../../../../domain/entities/IAuthResponse";

export interface AdminLoginDTO {
    email?: string;
    phone?: string;
    password: string;
}

export type AdminLoginResponseDTO = IAuthResponse | null;
