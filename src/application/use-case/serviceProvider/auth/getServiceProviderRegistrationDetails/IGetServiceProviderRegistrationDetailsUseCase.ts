import { inject, injectable } from "tsyringe";
import { IServiceProviderRepository } from "../../../../../domain/repositories/IserviceProviderRepository";
import { IServiceProvider } from "../../../../../domain/entities/IServiceProvider";

export interface IGetServiceProviderRegistrationDetailsUseCase {
  execute(userId: string): Promise<IServiceProvider | null>;
}
