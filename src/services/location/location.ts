import axios from "axios";
import { config } from "dotenv";
import { injectable } from "tsyringe";
import { ILocationService } from "./ILocationService";
import { getErrorMessage } from "../../utils/errorUtils";
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
    } catch (error: unknown) {
             const errorMessage =getErrorMessage(error)
            console.error("Error in getLocation:", errorMessage);
      

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
    } catch (error: unknown) {
      const errorMessage =getErrorMessage(error)
      console.error("Error in getAutoSuggestions:", errorMessage);
      throw new Error(errorMessage);
    }
  }
}
