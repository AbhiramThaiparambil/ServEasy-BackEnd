import { SafeUser } from "../../../../utils/sanitizers/userSanitizer";

export interface GetUserProfileRequestDTO {
  userId: string;
}

export interface GetUserProfileResponseDTO {
  user: SafeUser | null;
}
