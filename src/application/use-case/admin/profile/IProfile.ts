

import { SafeUser } from "../../../../utils/sanitizers/userSanitizer";

export interface IGetAdminProfileUseCase {
  execute(userId: string): Promise<SafeUser|null>;
}

