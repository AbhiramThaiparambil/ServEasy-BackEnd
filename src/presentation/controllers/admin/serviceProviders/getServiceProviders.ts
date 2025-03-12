import { Request, Response } from "express";
import { container } from "tsyringe";

import { getServiceProvidersUseCase } from "../../../../application/use-case/admin/getServiceProvidersUsercase";
export const getServiceProviders = async (req: Request, res: Response) => {
  try {
    console.log("all users");

    const getserviceProvidersUseCase = container.resolve(
      getServiceProvidersUseCase
    );

    const data = await getserviceProvidersUseCase.execute();

    data.reverse();
    res.status(200).json({ data });
  } catch (error) {}
};
