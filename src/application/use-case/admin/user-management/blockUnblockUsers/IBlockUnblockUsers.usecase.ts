import { BlockUnblockUserRequestDTO } from "../../../../dtos/admin/user/UserManagementDTO";

export interface IBlockUnblockUsers {
       execute(request: BlockUnblockUserRequestDTO): Promise<boolean> 
}
