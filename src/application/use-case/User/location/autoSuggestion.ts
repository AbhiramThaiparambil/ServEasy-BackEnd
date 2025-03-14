import { LocationService } from "../../../../services/location/location";
import { inject, injectable } from "tsyringe";

@injectable()
export class AutoSuggestion {
  constructor(@inject("LocationService") private location: LocationService) {}

  async execute(query: string) {
    try {
      return await this.location.getAutoSuggestions(query);
    } catch (error) {
      console.error("Error in AutoSuggestion use case:", error);
      throw new Error(error instanceof Error ? error.message : "Failed to fetch auto suggestions");
    }
  }
}
