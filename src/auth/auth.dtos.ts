import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty()
  loginUserId: string;

  @ApiProperty()
  password: string;
}
