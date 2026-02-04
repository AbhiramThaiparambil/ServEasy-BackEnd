export interface IDeleteAddress {
  execute(userId: string, addressId: string): Promise<boolean>;
}
