export interface GetUserListRequestDTO {
  skip: number;
  limit: number;
  search: string;
}

export interface UserResponseDTO {
  _id: string;
  userName: string;
  email: string | null;
  phone: string | null;
  isBlocked: boolean;
  profileImage?: string;
  isAdmin?: boolean;
  serviceProvider?: string;
}

export interface UserListResponseDTO {
  users: UserResponseDTO[];
  count: number;
}
