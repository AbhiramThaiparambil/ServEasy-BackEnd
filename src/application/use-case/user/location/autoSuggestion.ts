import { ILocationService } from "../../../../services/location/ILocationService";
import { inject, injectable } from "tsyringe";
import { IAutoSuggestion } from "./IAutoSuggestion";
import { SERVICE_TOKENS } from "../../../../constants/tokens";

@injectable()
export class AutoSuggestion implements IAutoSuggestion {
  constructor(
    @inject(SERVICE_TOKENS.LocationService)
    private location: ILocationService,
  ) {}

  async execute(query: string) {
    try {
      return await this.location.getAutoSuggestions(query);
    } catch (error) {
      console.error("Error in AutoSuggestion use case:", error);
      throw new Error(error instanceof Error ? error.message : "Failed to fetch auto suggestions");
    }
  }
}
