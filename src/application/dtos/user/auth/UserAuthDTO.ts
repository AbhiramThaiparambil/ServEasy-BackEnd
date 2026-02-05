import { IUser } from "../../../../domain/entities/IUser";

export interface SignUpRequestDTO {
  userName: string;
  email?: string;
  phone?: string;
  password: string;
}

export interface SignInRequestDTO {
  email?: string;
  phone?: string;
  password: string;
}

export interface AuthResponseDTO {
  accessToken?: string;
  refreshToken?: string;
  user?: IUser;
  errorMessage?: string;
}

export interface VerifyOtpRequestDTO {
  otp: string;
  sender: string;
}

export interface SendOtpRequestDTO {
  email?: string;
  phone?: string;
}
