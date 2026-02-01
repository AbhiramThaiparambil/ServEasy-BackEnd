export interface ILocationService {
  getLocation(query: string): Promise<{
    address: string;
    latitude: number;
    longitude: number;
  } | null>;
  getAutoSuggestions(query: string): Promise<Array<{
    address: string;
    latitude: number;
    longitude: number;
  }>>;
}
