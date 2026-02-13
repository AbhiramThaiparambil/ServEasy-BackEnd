import { AdminLoginDTO, AdminLoginResponseDTO } from "../../../dtos/admin/auth/AdminAuthDTO";

export interface IAdminSignin {
  execute(data: AdminLoginDTO): Promise<AdminLoginResponseDTO>;
}
