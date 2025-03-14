import { injectable, inject } from "tsyringe";
import { OAuth2Client } from "google-auth-library";
import { UserRepository } from "../../../../domain/repositories/IuserRepository";
import { User } from "../../../../domain/entities/user";
import { config } from "dotenv";
import { TokenService } from "../../../../services/auth/TokenService";
config();

@injectable()
export class GoogleAuthUseCase {
  private client: OAuth2Client;

  constructor(
    @inject("UserRepository") private userRepository: UserRepository,
    @inject("TokenService") private tokenService: TokenService
  ) {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async execute(googleToken: string) {
    try {
      console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);

      const ticket = await this.client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) throw new Error("Invalid Google token");

      console.log("Google Payload:", payload);

      const { sub, email, name, picture, email_verified } = payload;

      if (!email) {
        throw new Error("Email not found in Google payload");
      }

      let user = await this.userRepository.findByEmail(email);

      if (user) {
        if (!user.googleId) {
          user.googleId = sub;
          await this.userRepository.updateUser(user);
        }
      } else {
        
        const newUser: User = {
          isVerified: email_verified || false,
          password: sub,
          userName: name || email.split("@")[0], 
          email,
          googleId: sub,
          profileImage: picture || "",
        };

        user = await this.userRepository.create(newUser);
      }
          
      if(user){
        const accessToken=this.tokenService.generateAccessToken(user._id+"")
        const refreshToke=this.tokenService.generateRefreshToken(user._id="")
        return {accessToken,refreshToke}
      }else{
        throw new Error('use Auth failed')
      }
      

     
    } catch (error) {
      console.error("Google Auth Error:", error);
      throw new Error("Google Authentication Failed");
    }
  }
}