import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthRequest } from './auth.interfaces';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { LoginRequest } from './auth.dtos';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginRequest })
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req: LocalAuthRequest) {
    return this.authService.generateToken(req.user);
  }
}
