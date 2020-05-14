import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse, JwtPayload } from './auth.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    loginUserId: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userService.getUserByLoginUserId(loginUserId);

    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  async generateToken(user: User): Promise<LoginResponse> {
    const payload: JwtPayload = { id: user.id, sub: user.loginUserId };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }
}
