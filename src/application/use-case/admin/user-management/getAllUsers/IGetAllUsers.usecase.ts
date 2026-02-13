import { GetUserListRequestDTO, UserListResponseDTO } from "../../../../dtos/admin/user/UserManagementDTO";

export interface IGetAllUsers {
  execute(
    request: GetUserListRequestDTO
  ): Promise<UserListResponseDTO>;
}
