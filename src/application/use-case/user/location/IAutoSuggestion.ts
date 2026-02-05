import { GetAutoSuggestionRequestDTO, GetAutoSuggestionResponseDTO } from "../../../dtos/user/location/LocationDTO";

export interface IAutoSuggestion {
  execute(data: GetAutoSuggestionRequestDTO): Promise<GetAutoSuggestionResponseDTO>;
}
