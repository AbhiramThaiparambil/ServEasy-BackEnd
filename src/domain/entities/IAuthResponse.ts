import { User } from "./IUser";

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
