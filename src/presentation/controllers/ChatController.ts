import { Request, Response } from "express";
import { HttpStatus } from "../../constants/HttpStatus";
import { inject, injectable } from "tsyringe";
import { USE_CASE_TOKENS } from "../../constants/tokens";
import { IUploadChatImageUseCase } from "../../application/use-case/chat/uploadChatMedia/IUploadChatImage.usecase";
@injectable()
export class ChatController {
  constructor(
    @inject(USE_CASE_TOKENS.UploadChatImageUseCase)
    private uploadImageUseCase: IUploadChatImageUseCase
  ) {}

  uploadChatImage = async (req: Request, res: Response) => {
    try {
      const { image } = req.body;

      if (!image) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "No image uploaded" });
        return;
      }

      const result = await this.uploadImageUseCase.uploadImage(image);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Error uploading image", error });
    }
  };
}
