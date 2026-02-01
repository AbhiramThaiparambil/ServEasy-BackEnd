export interface IVerifyServiceProvider {
  execute(userId: string): Promise<string | false>;
}
