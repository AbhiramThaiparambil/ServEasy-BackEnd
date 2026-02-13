import { ILocationService } from "../../../../services/location/ILocationService";
import { inject, injectable } from "tsyringe";
import { IAutoSuggestion } from "./IAutoSuggestion";
import { SERVICE_TOKENS } from "../../../../constants/tokens";

import {
  GetAutoSuggestionRequestDTO,
  GetAutoSuggestionResponseDTO,
} from "../../../dtos/user/location/LocationDTO";
import { getErrorMessage } from "../../../../utils/errorUtils";


@injectable()
export class AutoSuggestion implements IAutoSuggestion {
  constructor(
    @inject(SERVICE_TOKENS.LocationService)
    private location: ILocationService
  ) {}

  async execute(
    data: GetAutoSuggestionRequestDTO
  ): Promise<GetAutoSuggestionResponseDTO> {
    try {
      const { query } = data;
      const suggestions = await this.location.getAutoSuggestions(query);
      return { suggestions };
    } catch (error: unknown) {
      console.error("Error in AutoSuggestion use case:", getErrorMessage(error));
      throw new Error(getErrorMessage(error));
    }
  }
}
