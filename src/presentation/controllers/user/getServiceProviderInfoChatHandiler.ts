import { Request, Response } from "express";
import { container } from "tsyringe";
import { HttpStatus } from "../../../constants/HttpStatus";
import { GetServiceProviderInfoUseCase } from "../../../application/use-case/User/getServiceProviderInfoUseCase";

export const getServiceProviderInfoChatHandiler = async (req: Request, res: Response): Promise<void> => {
  try {
    const getServiceProviderInfoUseCase = container.resolve(GetServiceProviderInfoUseCase);

    if (req.params.id) {
      const user = await getServiceProviderInfoUseCase.execute(req.params.id);
       res.status(HttpStatus.OK).json({
        userAvatar: user?.profileImage,
        userName: user?.serviceProviderName,
      });
      return
    }

    } catch (error) {
    console.error("Error in userProfile:", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
};
