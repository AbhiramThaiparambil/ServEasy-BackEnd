import { EditProfileRequestDTO } from "../../../../dtos/serviceProvider/profile/editProfile/EditProfileRequestDTO";

export interface IEditServiceProviderProfileUseCase {
  execute(data: EditProfileRequestDTO): Promise<boolean>;
}
