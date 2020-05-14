import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  roomTitle: string;
  @IsNotEmpty()
  roomSubtitle: string;
}

export class UpdateRoomDto {
  @IsOptional()
  roomTitle?: string;
  @IsOptional()
  roomSubtitle?: string;
}
