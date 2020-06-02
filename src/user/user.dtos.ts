import { IsNotEmpty, Length, IsOptional } from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiResponseProperty,
} from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  loginUserId: string;

  @ApiProperty({ minLength: 8 })
  @IsNotEmpty()
  @Length(8)
  password: string;

  @ApiProperty({ minLength: 3, maxLength: 24 })
  @IsNotEmpty()
  @Length(3, 24)
  username: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ minLength: 8 })
  @IsOptional()
  @Length(8)
  password?: string;

  @ApiPropertyOptional({ minLength: 8 })
  @IsOptional()
  @Length(3, 24)
  username?: string;
}

export class DeleteUserResponse {
  @ApiResponseProperty()
  success: boolean;
}
