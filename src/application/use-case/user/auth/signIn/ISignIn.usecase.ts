import { SignInRequestDTO } from "../../../../dtos/user/auth/signIn/SignInDTO";

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
