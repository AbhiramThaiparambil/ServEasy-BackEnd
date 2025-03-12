
import {inject,injectable} from 'tsyringe'
import { UserRepository } from '../../../domain/repositories/userRepository'

@injectable()
export class UpdateUserWithServiceProviderUseCase {
    constructor(
        @inject("UserRepository") private userRepository: UserRepository
    ) {}

    async execute(userId: string, serviceProviderId: string): Promise<boolean|void> {
       try {
        console.log(userId);
        console.log(serviceProviderId);
        
        
        return this.userRepository.addServiceProviderId(userId,serviceProviderId)

       } catch (error) {
        console.log(error);
        
       }
    }
}
