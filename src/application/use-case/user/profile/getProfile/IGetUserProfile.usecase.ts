import { SafeUser } from "../../../../../utils/sanitizers/userSanitizer";

export interface IGetUserProfileUseCase {
  execute(userId: string): Promise<SafeUser | null>;
}
