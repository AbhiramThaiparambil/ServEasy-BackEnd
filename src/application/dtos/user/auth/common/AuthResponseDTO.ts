import { IUser } from "../../../../../domain/entities/IUser";

export interface AuthResponseDTO {
  accessToken?: string;
  refreshToken?: string;
  user?: IUser;
  errorMessage?: string;
}
