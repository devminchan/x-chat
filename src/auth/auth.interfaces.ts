export interface LoginResponse {
  accessToken: string;
}

export interface JwtPayload {
  id: number;
  sub: string;
}

export interface UserPrincple {
  id: number;
}
