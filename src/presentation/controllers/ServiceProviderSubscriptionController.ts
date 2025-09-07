import { inject, injectable } from "tsyringe";
import { SERVICE_TOKENS } from "../../utils/constants/tokens";
import { IGoogleGenAIService } from "../../services/aiAssistant/IgoogleGenAIService";
import {Request,Response } from "express";
import { HttpStatus } from "../../constants/HttpStatus";
@injectable()

export class ServiceProviderSubscriptionController{

    constructor(@inject(SERVICE_TOKENS.GoogleGenAIService) private googleGenAIService: IGoogleGenAIService) {}

    async handleChatRequest(req:Request,res:Response): Promise<any> {
        const { message } = req.body;
       
        const response = await this.googleGenAIService.generateResponse('what is internet ')
          res.status(HttpStatus.OK).json({ message: response.text })


    }
}



