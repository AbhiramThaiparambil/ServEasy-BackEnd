import { Request, Response } from "express";
import { container } from "tsyringe";
import { AutoSuggestion } from "../../application/use-case/user/location/autoSuggestion";
import { HttpStatus } from "../../constants/HttpStatus";
import { GetAutoSuggestionRequestDTO } from "../../application/dtos/user/location/LocationDTO";
import { getErrorMessage } from "../../utils/errorUtils";


export const getAutoSuggestions = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    console.log(req.query);

    if (!query) {
       res.status(HttpStatus.BAD_REQUEST).json({ message: "query is required" });
       return
    }


    const auto = container.resolve(AutoSuggestion);
    const dto: GetAutoSuggestionRequestDTO = { query: query as string };
    const suggestions = await auto.execute(dto);

    console.log(suggestions);
     res.status(HttpStatus.OK).json(suggestions); 
      return
  } catch (error: unknown) {
    console.error("Error in getAutoSuggestions:", getErrorMessage(error));
     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error", error: getErrorMessage(error) });
     return
    }
};
