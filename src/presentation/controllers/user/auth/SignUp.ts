import { Request, Response } from "express";

import { config } from "dotenv";
import { HttpStatus } from "../../../../constants/HttpStatus";
import { setAuthCookies } from "../../../../utils/setAuthCookies";
import { SignIn } from "../../../../application/use-case/User/auth/SignIn";

config();

const signInUseCase = SignIn.create();

export const signIn = async (req: Request, res: Response) => {
  const { method } = req.params;

  try {
    if (method === "email") {
      const { email, password } = req.body;

      if (!email || !password) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: "Email and password are required" });
        return;
      }

      const result = await signInUseCase.signInWithEmail(email, password);
      console.log(result);

     

      if (result?.errorMessage) {
        res.status(401).json({ error: result.errorMessage });
        return;
      }

   
if(result?.refreshToken){
  setAuthCookies(res,"refreshToken",result?.refreshToken)

}      
      res.status(HttpStatus.OK).json({ accessToken: result?.accessToken });
      return;
    }

    if (method === "phone") {
      console.log("Phone Sign-In");

      const { phone, password } = req.body;

      if (!phone || !password) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: "Phone and password are required" });
        return;
      }

      const result = await signInUseCase.signInWithPhone(phone, password);


      if (result?.errorMessage) {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ error: result.errorMessage });
        return;
      }

  

      if(result?.refreshToken){
        setAuthCookies(res,"refreshToken",result?.refreshToken)
      
      }

      res.status(HttpStatus.OK).json({ accessToken: result?.accessToken });
      return;
    }
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
    return;
  }
};
