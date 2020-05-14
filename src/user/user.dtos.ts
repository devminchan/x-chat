import { IsNotEmpty, Length, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  loginUserId: string;

  @IsNotEmpty()
  @Length(8)
  password: string;

  @IsNotEmpty()
  @Length(3, 24)
  username: string;
}

export class UpdateUserDto {
  @IsOptional()
  @Length(8)
  password?: string;

  @IsOptional()
  @Length(3, 24)
  username?: string;
}
