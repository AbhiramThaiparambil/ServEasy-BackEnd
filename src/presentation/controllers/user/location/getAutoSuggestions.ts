import { Request, Response } from "express";
import { container } from "tsyringe";
import { AutoSuggestion } from "../../../../application/use-case/User/location/autoSuggestion";

export const getAutoSuggestions = async (req: Request, res: Response) => {
  try {
    const { query } = req.query; // Fixed typo: "query" instead of "qurey"
    console.log(req.query);

    if (!query) {
       res.status(400).json({ message: "query is required" });
       return
    }

    const auto = container.resolve(AutoSuggestion);
    const suggestions = await auto.execute(query as string);

    console.log(suggestions);
     res.status(200).json(suggestions); 
      return
  } catch (error) {
    console.error("Error in getAutoSuggestions:", error);
     res.status(500).json({ message: "Internal Server Error", error });
     return
    }
};
