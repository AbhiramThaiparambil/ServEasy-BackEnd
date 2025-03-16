import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserProfileUpdate } from "../../../application/use-case/User/updateProfile";

export const userProfileUpdate = async (req: Request, res: Response) => {
  try {
    console.log("Request Body:", req.body);
    console.log("User ID:", req.params.userid);

    const { newEmail, newPhone, newUserName, NewProfileImage } = req.body;
    const userId = req.params.userid;

    if (!userId) {
       res.status(400).json({ message: "User ID is required" });
       return
      }

    const userProfile = container.resolve(UserProfileUpdate);


    if (newUserName || NewProfileImage) {
      await userProfile.updateProfile(userId, newUserName, NewProfileImage);
    }


    let otpResponse;
    
    if (newEmail) {
      otpResponse = await userProfile.sendEmailOtp(newEmail);
      if (otpResponse.errorMessage) {
         res.status(400).json({ message: otpResponse.errorMessage });
         return
        }
       res.status(203).json({ message: otpResponse.successMessage, auth: otpResponse.auth });
       return
      }

    if (newPhone) {
      otpResponse = await userProfile.sendSmsOtp(newPhone);
      if (otpResponse.errorMessage) {
         res.status(400).json({ message: otpResponse.errorMessage });
         return
        }
       res.status(203).json({ message: otpResponse.successMessage, auth: otpResponse.auth });
       return
      }

   

     res.status(200).json({ message: "Profile updated successfully" });

     return
  } catch (error) {
    console.error("Error updating profile:", error);
     res.status(500).json({ message: "Internal Server Error" });
     return
    }
};
