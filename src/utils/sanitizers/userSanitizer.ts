import { IUser } from "../../domain/entities/IUser";

export interface SafeUser {
  _id?: string;
  userName: string;
  email: string | null;
  phone: string | null;
  isBlocked: boolean;
  profileImage?: string;
  isAdmin?: boolean;
  serviceProvider?: string;
}

export const userSanitizer = (user: IUser): SafeUser => {
  const safeUser: SafeUser = {
    _id: user._id,
    userName: user.userName,
    email: user.email || null,
    phone: user.phone || null,
    isBlocked: user.isBlocked || false,
    profileImage: user.profileImage,
    isAdmin: user.isAdmin,
  };

  if (user.serviceProvider) {
    safeUser.serviceProvider = user.serviceProvider;
  }

  return safeUser;
};
