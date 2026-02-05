import { SignInRequestDTO } from "../../../../../application/dtos/user/auth/UserAuthDTO";

export interface ISignInUseCase {
  signInWithEmail(
    data: SignInRequestDTO
  ): Promise<
    { accessToken: string; refreshToken: string } | { errorMessage: string }
  >;

  signInWithPhone(
    data: SignInRequestDTO
  ): Promise<
    { accessToken: string; refreshToken: string } | { errorMessage: string }
  >;
}
