export interface AdminProfileResponseDTO {
    _id?: string;
    userName: string;
    email: string | null;
    phone: string | null;
    isBlocked: boolean;
    profileImage?: string;
    isAdmin?: boolean;
}
