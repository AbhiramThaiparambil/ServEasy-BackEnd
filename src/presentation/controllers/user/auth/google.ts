// import { Request, Response } from "express";
// import { container } from "tsyringe";
// import { HttpStatus } from "../../../../constants/HttpStatus";
// import { setAuthCookies } from "../../../../utils/setAuthCookies";
// import { GoogleAuthUseCase } from "../../../../application/use-case/User/auth/googleAuth/GoogleAuth.usecase";

// export const googleAuth = async (req: Request, res: Response) => {
//   try {
//     const { googleToken } = req.body;
//     if (!googleToken) {
//       res
//         .status(HttpStatus.BAD_REQUEST)
//         .json({ message: "google token is Required" });
//     }
//     const googleUseCase = container.resolve(GoogleAuthUseCase);
//     const result = await googleUseCase.execute(googleToken);

//     setAuthCookies(res, "refreshToken", result?.refreshToken);

//     res.status(HttpStatus.OK).json({ accessToken: result?.accessToken });
//   } catch (error) {
//     console.error(error);
//   }
// };
