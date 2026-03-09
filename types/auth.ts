export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  provider: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}
