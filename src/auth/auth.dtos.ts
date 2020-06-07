import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { HasAccessToken } from './auth.interfaces';

export class LoginRequest {
  @ApiProperty()
  loginUserId: string;

  @ApiProperty()
  password: string;
}

export class LoginResponse implements HasAccessToken {
  @ApiResponseProperty()
  accessToken: string;
}
