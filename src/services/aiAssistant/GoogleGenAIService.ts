import { config } from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { injectable } from "tsyringe";
import { IGoogleGenAIService } from "./IGoogleGenAIService";
config();

@injectable()
export class GoogleGenAIService implements IGoogleGenAIService {
  ai!: GoogleGenAI;
  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  async generateResponse(prompt: string): Promise<any> {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      console.log("GoogleGenAIService response:", response.text);
      return response;
    } catch (err) {
      console.error("GoogleGenAIService error:", err);
      throw err;
    }
  }
}
