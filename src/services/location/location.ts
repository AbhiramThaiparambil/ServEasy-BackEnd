import axios from "axios";
import { config } from "dotenv"; 
import { injectable } from "tsyringe";


@injectable()
export class LocationService {
  private locationUrl = "https://us1.locationiq.com/v1/search.php"; 
  private locationIqApiKey=process.env.LOCATIONIQ_API_KEY as string
  async getLocation(query: string){
    try {
      if (this.locationIqApiKey) {
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
    } catch (error) {
      console.error("Error fetching location:", error);
      return null;
    }
  }
}
