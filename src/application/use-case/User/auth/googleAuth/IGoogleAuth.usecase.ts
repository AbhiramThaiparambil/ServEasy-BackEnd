export interface IGoogleAuthUseCase {
  execute(googleToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }>;
}
