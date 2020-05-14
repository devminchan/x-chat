import { Request } from 'express';
import { User } from 'src/user/user.entity';

export interface LoginResponse {
  accessToken: string;
}

export interface JwtPayload {
  id: number;
  sub: string;
}

export interface UserPrinciple {
  id: number;
}

export interface LocalAuthRequest extends Request {
  user: User;
}

export interface PrincipleRequest extends Request {
  user: UserPrinciple;
}
