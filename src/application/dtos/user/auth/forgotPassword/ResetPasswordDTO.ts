export interface ResetPasswordRequestDTO {
  newPassword: string;
  email?: string;
  phone?: string;
}
