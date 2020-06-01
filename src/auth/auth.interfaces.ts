import { Request } from 'express';
import { User } from 'src/user/user.entity';

export interface LoginResponse {
  accessToken: string;
}

export interface JwtPayload {
  id: number;
  sub: string;
  isAdmin: boolean;
}

export interface UserPrinciple {
  id: number;
  isAdmin: boolean;
}

export interface LocalAuthRequest extends Request {
  user: User;
}

export interface PrincipleRequest extends Request {
  user: UserPrinciple;
}
