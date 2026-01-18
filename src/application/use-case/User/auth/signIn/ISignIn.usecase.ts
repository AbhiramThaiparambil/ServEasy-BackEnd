export interface ISignInUseCase {
  signInWithEmail(
    email: string,
    password: string
  ): Promise<
    { accessToken: string; refreshToken: string } | { errorMessage: string }
  >;

  signInWithPhone(
    phone: string,
    password: string
  ): Promise<
    { accessToken: string; refreshToken: string } | { errorMessage: string }
  >;
}
