import { SafeUser } from "../../../../../utils/sanitizers/userSanitizer";

export interface IGetAllUsers {
  execute(
    skip: number,
    limit: number,
    search: string
  ): Promise<{ users: SafeUser[]; count: number }>;
}
