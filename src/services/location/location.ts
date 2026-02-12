import axios from "axios";
import { config } from "dotenv";
import { injectable } from "tsyringe";
import { ILocationService } from "./ILocationService";
config();
interface ILocationIQResponse {
  lat: string;
  lon: string;
  display_name: string;
}

@injectable()
export class LocationService implements ILocationService {
  private locationUrl = "https://us1.locationiq.com/v1/search.php";
  private locationIqApiKey = process.env.LOCATIONIQ_API_KEY as string;
  async getLocation(query: string) {
    try {
      if (!this.locationIqApiKey) {
        throw new Error("LocationIQ API key is not defined");
      }

      const response = await axios.get(this.locationUrl, {
        params: {
          key: this.locationIqApiKey,
          q: query,
          format: "json",
        },
      });

      if (!response.data.length) return null;

      const result = response.data[0];
      return {
        address: result.display_name,
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
      };
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      throw new Error(errorMessage);
    }
  }

  async getAutoSuggestions(query: string) {
    try {
      if (!this.locationIqApiKey) {
        throw new Error("LocationIQ API key is not defined");
      }

      const response = await axios.get(
        "https://us1.locationiq.com/v1/autocomplete.php",
        {
          params: {
            key: this.locationIqApiKey,
            q: query,
            limit: 5,
            format: "json",
          },
        }
      );

      const suggestions = response.data.map((item: ILocationIQResponse) => ({
        address: item.display_name,
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
      }));

      console.log("Auto-suggestions:", suggestions);

      return suggestions;
    } catch (error: any) {
      console.error(
        "Error in getAutoSuggestions:",
        (error as any)?.response?.data || (error instanceof Error ? error.message : error)
      );
      throw new Error(error instanceof Error ? error.message : "Failed to fetch auto suggestions");
    }
  }
}
