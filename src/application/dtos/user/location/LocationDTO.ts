export interface GetAutoSuggestionRequestDTO {
  query: string;
}

export interface AutoSuggestionResponse {
  address: string;
  latitude: number;
  longitude: number;
}

export interface GetAutoSuggestionResponseDTO {
  suggestions: AutoSuggestionResponse[];
}
