import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthRequest, HasAccessToken } from './auth.interfaces';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginRequest, LoginResponse } from './auth.dtos';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginRequest })
  @ApiResponse({
    type: LoginResponse
  })
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req: LocalAuthRequest): Promise<HasAccessToken> {
    return this.authService.generateToken(req.user);
  }
}
