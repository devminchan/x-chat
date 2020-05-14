import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

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
}
