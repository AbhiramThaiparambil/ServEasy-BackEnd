import { GoogleAuthRequestDTO } from "../../../../dtos/user/auth/googleAuth/GoogleAuthDTO";

export interface IGoogleAuthUseCase {
  execute(data: GoogleAuthRequestDTO): Promise<{
    accessToken: string;
    refreshToken: string;
  }>;
}
