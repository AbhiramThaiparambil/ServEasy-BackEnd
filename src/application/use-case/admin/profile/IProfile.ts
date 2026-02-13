

import { AdminProfileResponseDTO } from "../../../dtos/admin/profile/AdminProfileResponseDTO";

export interface IGetAdminProfileUseCase {
  execute(userId: string): Promise<AdminProfileResponseDTO | null>;
}

