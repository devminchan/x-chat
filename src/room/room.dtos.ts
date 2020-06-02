import { IsNotEmpty, IsOptional } from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiResponseProperty,
} from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty()
  @IsNotEmpty()
  roomTitle: string;

  @ApiProperty()
  @IsNotEmpty()
  roomSubtitle: string;
}

export class UpdateRoomDto {
  @ApiPropertyOptional()
  @IsOptional()
  roomTitle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  roomSubtitle?: string;
}

export class DeleteRoomResponse {
  @ApiResponseProperty()
  success: boolean;
}
