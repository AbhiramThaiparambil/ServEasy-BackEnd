import { GenerateContentResponse } from "@google/genai";

export interface IGoogleGenAIService {

       generateResponse(prompt:string): Promise<GenerateContentResponse>;


}
