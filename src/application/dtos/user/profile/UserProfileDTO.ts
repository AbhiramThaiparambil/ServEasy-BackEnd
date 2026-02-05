import { SafeUser } from "../../../../utils/sanitizers/userSanitizer";

export interface UpdateProfileRequestDTO {
  userId: string;
  newUserName?: string;
  newProfileImage?: string;
  newPassword?: string;
  oldPassword?: string;
}

export interface ProfileOtpResponseDTO {
  successMessage?: string;
  errorMessage?: string;
  auth?: string;
}

export interface UserProfileResponseDTO {
  user: SafeUser | null;
}
