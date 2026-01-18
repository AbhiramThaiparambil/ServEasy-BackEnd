export interface IBlockUnblockUsers {

       unblockUser(userId: string): Promise<boolean> 
   blockUser(userId: string): Promise<boolean> 

}
