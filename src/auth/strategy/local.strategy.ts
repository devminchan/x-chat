import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'loginUserId',
    });
  }

  async validate(loginUserId: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(loginUserId, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
