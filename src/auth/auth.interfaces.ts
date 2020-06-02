import { Request } from 'express';
import { User } from 'src/user/user.entity';
import { Socket } from 'socket.io';

export interface HasAccessToken {
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

export interface PrincipleSocket extends Socket {
  user: UserPrinciple;
}
